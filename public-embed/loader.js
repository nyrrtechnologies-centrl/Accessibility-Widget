(function () {
  const script = document.currentScript;
  const clientId = script.getAttribute('data-client-id');
  const domain = window.location.hostname;

  if (!clientId) {
    console.warn('[Widget] Missing data-client-id on embed script.');
    return;
  }

  const VERIFY_URL = 'https://widget-verify.nyrrtechnologies.workers.dev'; // or your custom domain from 4k
  const CDN_BASE = 'https://cdn.scryweb.com'; // your Pages URL/custom domain from Step 3

  fetch(`${VERIFY_URL}/?client_id=${encodeURIComponent(clientId)}&domain=${encodeURIComponent(domain)}`)
    .then((res) => res.json())
    .then((result) => {
      if (!result.valid) {
        console.warn('[Widget] License check failed:', result.reason);
        return;
      }
      loadWidget();
    })
    .catch((err) => {
      console.warn('[Widget] Verification request failed:', err);
    });

  function loadWidget() {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `${CDN_BASE}/accessibility-widget.css`;
    document.head.appendChild(css);

    const core = document.createElement('script');
    core.src = `${CDN_BASE}/widget-core.js`;
    core.onload = function () {
      const ui = document.createElement('script');
      ui.src = `${CDN_BASE}/widget-ui.js`;
      document.body.appendChild(ui);
    };
    document.body.appendChild(core);
  }
})();