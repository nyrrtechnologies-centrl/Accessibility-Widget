export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const clientId = url.searchParams.get('client_id');
    const domain = url.searchParams.get('domain');

    // Basic input validation
    if (!clientId || !domain) {
      return jsonResponse({ valid: false, reason: 'missing_params' }, 400);
    }

    // Query Supabase for this client
    const supabaseUrl = `${env.SUPABASE_URL}/rest/v1/widget_clients?client_id=eq.${encodeURIComponent(clientId)}&select=*`;

    const res = await fetch(supabaseUrl, {
      headers: {
        apikey: env.SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      },
    });

    const rows = await res.json();
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
+
+function normalizeThemeConfig(client) {
+  const directTheme = typeof client.theme === 'string'
+    ? (() => {
+        try { return JSON.parse(client.theme); } catch (e) { return client.theme; }
+      })()
+    : client.theme;
+
+  if (directTheme && typeof directTheme === 'object') {
+    return directTheme;
+  }
+  if (directTheme && typeof directTheme === 'string') {
+    const value = directTheme.trim();
+    if (value === 'light' || value === 'dark') {
+      return { mode: value };
+    }
+    if (/^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(value)) {
+      return { preset: 'custom', customColor: value.startsWith('#') ? value : `#${value}` };
+    }
+    return { preset: value };
+  }
+
+  return {
+    preset: client.theme_preset || client.themePreset || client.theme_preset_name || client.brand_theme_preset || client.brandPreset || null,
+    customColor: client.theme_primary_color || client.theme_primaryColour || client.theme_color || client.themeColor || client.custom_color || client.primary_color || null,
+    position: client.theme_position || client.themePosition || client.position || null,
+    mode: client.theme_mode || client.themeMode || client.ui_theme || client.default_theme || null,
+    logoUrl: client.theme_logo_url || client.themeLogoUrl || client.logo_url || client.logoUrl || null,
+  };
+}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // needed since client sites call this cross-origin
    },
  });
}