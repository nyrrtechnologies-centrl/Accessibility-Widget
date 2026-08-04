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
  const position = firstValue(client, ['theme_position', 'themePosition', 'position']);
  const mode = firstValue(client, ['theme_mode', 'themeMode', 'ui_theme', 'default_theme']);
  const logoUrl = firstValue(client, [
    'theme_logo_url', 'themeLogoUrl', 'logo_url', 'logoUrl', 'brand_logo_url', 'brandLogoUrl',
  ]);

  if (preset) theme.preset = String(preset).trim().toLowerCase();
  if (customColor) {
    theme.customColor = normalizeHexColor(customColor);
    // A populated primary colour is itself sufficient to activate a custom theme.
    if (!preset || theme.preset === 'default') theme.preset = 'custom';
  }
  if (position) theme.position = String(position).trim().toLowerCase();
  if (mode) theme.mode = String(mode).trim().toLowerCase();
  if (logoUrl) theme.logoUrl = String(logoUrl).trim();

  return theme;
}

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
