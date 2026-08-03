(function () {
  var script = document.currentScript;
  var clientId = script.getAttribute('data-client-id');
  var domain = window.location.hostname;

  if (!clientId) {
    console.warn('[Widget] Missing data-client-id on embed script.');
    return;
  }

  // Replace with your actual deployed URLs.
  var VERIFY_URL = 'https://widget-verify.nyrrtechnologies.workers.dev';   
  var CDN_BASE   = 'https://cdn.scryweb.com';   // Pages CDN from Step 3

  fetch(VERIFY_URL + '/?client_id=' + encodeURIComponent(clientId) + '&domain=' + encodeURIComponent(domain))
    .then(function (res) { return res.json(); })
    .then(function (result) {
      if (!result.valid) {
        console.warn('[Widget] License check failed:', result.reason);
        return;
      }

      // Make the client's plan + theme available to widget-core.js,
      // which reads window.__WIDGET_CONFIG__.theme in applyAll().
      window.__WIDGET_CONFIG__ = {
        plan: result.plan,
        theme: result.theme || null, // { preset, customColor, position, logoUrl }
      };

      loadWidget();
    })
    .catch(function (err) {
      console.warn('[Widget] Verification request failed:', err);
    });

  function loadWidget() {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = CDN_BASE + '/accessibility-widget.css';
    document.head.appendChild(css);

    var core = document.createElement('script');
    core.src = CDN_BASE + '/widget-core.js';
    core.onload = function () {
      var ui = document.createElement('script');
      ui.src = CDN_BASE + '/widget-ui.js';
      document.body.appendChild(ui);
    };
    document.body.appendChild(core);
  }
})();
