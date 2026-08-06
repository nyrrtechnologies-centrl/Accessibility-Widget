export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    const url = new URL(request.url);
    const clientId = url.searchParams.get('client_id');
    const domain = url.searchParams.get('domain');

    // Basic input validation
    if (!clientId || !domain) {
      return jsonResponse({ valid: false, reason: 'missing_params' }, 400);
    }

    // Query Supabase for this client
    const supabaseUrl = `${env.SUPABASE_URL}/rest/v1/widget_clients?client_id=eq.${encodeURIComponent(clientId)}&select=*`;

    let res;
    try {
      res = await fetch(supabaseUrl, {
        headers: {
          apikey: env.SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        },
      });
    } catch (error) {
      return jsonResponse({ valid: false, reason: 'verification_unavailable' }, 502);
    }

    if (!res.ok) {
      return jsonResponse({ valid: false, reason: 'verification_failed' }, 502);
    }

    let rows;
    try {
      rows = await res.json();
    } catch (error) {
      return jsonResponse({ valid: false, reason: 'invalid_verification_response' }, 502);
    }

    if (!Array.isArray(rows)) {
      return jsonResponse({ valid: false, reason: 'invalid_verification_response' }, 502);
    }
    const client = rows[0];

    if (!client) {
      return jsonResponse({ valid: false, reason: 'unknown_client' }, 404);
    }

    if (client.status !== 'active') {
      return jsonResponse({ valid: false, reason: 'inactive' }, 403);
    }

    // Normalize domains (strip www.) before comparing
    const normalizedDomain = domain.replace(/^www\./, '');
    const allowedDomains = Array.isArray(client.allowed_domains) ? client.allowed_domains : [];
    const allowed = allowedDomains.some(
      (d) => String(d).replace(/^www\./, '') === normalizedDomain
    );

    if (!allowed) {
      return jsonResponse({ valid: false, reason: 'domain_mismatch' }, 403);
    }

    return jsonResponse({
      valid: true,
      plan: client.plan,
      theme: normalizeThemeConfig(client),
    });
  },
};

function normalizeThemeConfig(client) {
  const directTheme = typeof client.theme === 'string'
    ? (() => {
        try { return JSON.parse(client.theme); } catch (error) { return client.theme; }
      })()
    : client.theme;

  let theme = {};

  if (directTheme && typeof directTheme === 'object' && !Array.isArray(directTheme)) {
    theme = { ...directTheme };
  }
  if (typeof directTheme === 'string' && directTheme.trim()) {
    const value = directTheme.trim();
    const normalizedValue = value.toLowerCase();
    if (normalizedValue === 'light' || normalizedValue === 'dark') {
      theme.mode = normalizedValue;
    } else if (/^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(value)) {
      theme.preset = 'custom';
      theme.customColor = value.startsWith('#') ? value : `#${value}`;
    } else {
      theme.preset = normalizedValue;
    }
  }

  const preset = firstValue(client, [
    'theme_preset', 'themePreset', 'theme_preset_name', 'brand_theme_preset', 'brandPreset',
  ]);
  const customColor = firstValue(client, [
    'theme_primary_color', 'theme_primaryColour', 'theme_color', 'themeColor',
    'custom_color', 'customColor', 'primary_color', 'primaryColor',
  ]);
  const bgColor = firstValue(client, [
    'theme_bg_color', 'themeBgColor', 'theme_background_color',
    'bg_color', 'bgColor', 'background_color', 'backgroundColor',
  ]);
  const position = firstValue(client, [
    'widget_position', 'widgetPosition', 'theme_position', 'themePosition', 'position',
  ]);
  const mode = firstValue(client, ['theme_mode', 'themeMode', 'ui_theme', 'default_theme']);
  const logoUrl = firstValue(client, [
    'theme_logo_url', 'themeLogoUrl', 'logo_url', 'logoUrl', 'brand_logo_url', 'brandLogoUrl',
  ]);

  // Advanced appearance — each one overrides a single step of the ramp the
  // widget otherwise derives automatically from customColor/bgColor. Left
  // null/absent on the row, they're simply omitted here and the widget
  // falls back to its own derivation.
  const accentLight = firstValue(client, ['theme_accent_light', 'themeAccentLight']);
  const accentHover = firstValue(client, ['theme_accent_hover', 'themeAccentHover']);
  const buttonTextColor = firstValue(client, ['theme_button_text_color', 'themeButtonTextColor']);
  const tintStrength = firstValue(client, ['theme_tint_strength', 'themeTintStrength']);
  const borderRadius = firstValue(client, ['theme_border_radius', 'themeBorderRadius']);
  const buttonStyle = firstValue(client, ['theme_button_style', 'themeButtonStyle']);
  const fontFamily = firstValue(client, ['theme_font_family', 'themeFontFamily']);
  const successColor = firstValue(client, ['theme_success_color', 'themeSuccessColor']);
  const errorColor = firstValue(client, ['theme_error_color', 'themeErrorColor']);
  const infoColor = firstValue(client, ['theme_info_color', 'themeInfoColor']);

  if (preset) theme.preset = String(preset).trim().toLowerCase();
  if (customColor) {
    theme.customColor = normalizeHexColor(customColor);
    // A populated primary colour is itself sufficient to activate a custom theme.
    if (!preset || theme.preset === 'default') theme.preset = 'custom';
  }
  if (bgColor) theme.bgColor = normalizeHexColor(bgColor);
  if (position) {
    // Only the four positions the widget stylesheet actually implements; anything
    // else falls through to the widget's own bottom-right default.
    const value = String(position).trim().toLowerCase();
    if (VALID_POSITIONS.has(value)) theme.position = value;
  }
  if (mode) theme.mode = String(mode).trim().toLowerCase();
  if (logoUrl) theme.logoUrl = String(logoUrl).trim();
  if (accentLight) theme.accentLight = normalizeHexColor(accentLight);
  if (accentHover) theme.accentHover = normalizeHexColor(accentHover);
  if (buttonTextColor) theme.buttonTextColor = normalizeHexColor(buttonTextColor);
  if (tintStrength !== null && tintStrength !== undefined && tintStrength !== '') {
    const value = Number(tintStrength);
    if (Number.isFinite(value)) theme.tintStrength = value;
  }
  if (borderRadius !== null && borderRadius !== undefined && borderRadius !== '') {
    const value = Number(borderRadius);
    if (Number.isFinite(value)) theme.borderRadius = value;
  }
  if (buttonStyle) {
    const value = String(buttonStyle).trim().toLowerCase();
    if (VALID_BUTTON_STYLES.has(value)) theme.buttonStyle = value;
  }
  if (fontFamily) theme.fontFamily = String(fontFamily).trim();
  if (successColor) theme.successColor = normalizeHexColor(successColor);
  if (errorColor) theme.errorColor = normalizeHexColor(errorColor);
  if (infoColor) theme.infoColor = normalizeHexColor(infoColor);

  return theme;
}

const VALID_POSITIONS = new Set([
  'bottom-right', 'bottom-left', 'top-right', 'top-left',
]);

const VALID_BUTTON_STYLES = new Set(['gradient', 'solid']);

function firstValue(source, keys) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (value !== null && value !== undefined && value !== '') return value;
  }
  return null;
}

function normalizeHexColor(value) {
  const color = String(value).trim();
  if (/^#([a-f\d]{3}|[a-f\d]{6})$/i.test(color)) return color;
  if (/^([a-f\d]{3}|[a-f\d]{6})$/i.test(color)) return `#${color}`;
  return color;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(),
      'Content-Type': 'application/json',
    },
  });
}
