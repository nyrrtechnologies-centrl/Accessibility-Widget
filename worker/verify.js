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
    const allowed = client.allowed_domains.some(
      (d) => d.replace(/^www\./, '') === normalizedDomain
    );

    if (!allowed) {
      return jsonResponse({ valid: false, reason: 'domain_mismatch' }, 403);
    }

    return jsonResponse({ valid: true, plan: client.plan });
  },
};

return jsonResponse({
  valid: true,
  plan: client.plan,
  theme: {
    preset: client.theme_preset,
    customColor: client.theme_preset === 'custom' ? client.theme_primary_color : null,
    position: client.theme_position,
    logoUrl: client.theme_logo_url,
  },
});