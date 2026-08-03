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
  var ASSET_VERSION = '5';

  function assetUrl(path) {
    return CDN_BASE + '/' + path + '?v=' + ASSET_VERSION;
  }

  function normalizeThemeConfig(result) {
    if (result.theme && typeof result.theme === 'object') {
     return result.theme;
    }
    if (result.themeConfig && typeof result.themeConfig === 'object') {
     return result.themeConfig;
    }
    if (result.brandTheme && typeof result.brandTheme === 'object') {
     return result.brandTheme;
    }
    if (result.theme && typeof result.theme === 'string') {
     return { preset: result.theme };
    }
    if (result.themeMode || result.theme_mode) {
     return { mode: result.themeMode || result.theme_mode };
    }
    return null;
  }

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
        plan: result.plan || result.plan_name || null,
        theme: normalizeThemeConfig(result),
        raw: result,
      };
 
      loadWidget();
    })
    .catch(function (err) {
      console.warn('[Widget] Verification request failed:', err);
    });

  function loadWidget() {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = assetUrl('accessibility-widget.css');
    document.head.appendChild(css);

    var core = document.createElement('script');
    core.src = assetUrl('widget-core.js');
    core.onload = function () {
      var ui = document.createElement('script');
      ui.src = assetUrl('widget-ui.js');
      ui.onload = function () {
        // Apply once more after the shadow DOM exists. This makes the
        // config handoff explicit and avoids initialization-order races.
        if (window.__ak && window.__WIDGET_CONFIG__) {
          window.__ak.applyBrandTheme(window.__WIDGET_CONFIG__.theme);
        }
      };
      document.body.appendChild(ui);
    };
    document.body.appendChild(core);
  }
})();
