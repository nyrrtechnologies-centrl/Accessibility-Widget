(function(){"use strict";const a=window.__ak;if(!a)return;const s=a.S,f=document.currentScript;function A(){try{const e=f&&f.src;if(e)return e.replace(/widget-ui\.js(\?.*)?(#.*)?$/,"accessibility-widget.css")}catch(e){}return"accessibility-widget.css"}const M='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',I='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>',z=`
<div id="ak-shell" data-ak-theme="dark">
<button id="ak-fab" aria-label="Open Accessibility Assistant" title="Open the accessibility toolbar">
<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
<circle cx="12" cy="5" r="1.5" fill="white" stroke="none"/>
<path d="M5 9l7 1 7-1M12 10v5M9 20l3-5 3 5"/>
</svg></button>
<div id="ak-fab-tooltip">Accessibility Assistant</div>
<div id="ak-panel" role="dialog" aria-label="Accessibility Assistant" aria-modal="true">
<div class="ak-header">
<div class="ak-header-left">
<div class="ak-logo"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="5" r="1.5" fill="white" stroke="none"/><path d="M5 9l7 1 7-1M12 10v5M9 20l3-5 3 5"/></svg></div>
<div><div class="ak-title">Accessibility Assistant</div><div class="ak-subtitle">Accessibility Widget</div></div>
</div>
<div class="ak-header-actions">
<button class="ak-icon-btn" id="ak-theme-btn" title="Switch the panel between light and dark mode" aria-label="Toggle theme">${I}</button>
<button class="ak-icon-btn" id="ak-reset-btn" title="Clear every saved preference (except your API key) and reload the page" aria-label="Reset all settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg></button>
<button class="ak-icon-btn" id="ak-close-btn" title="Close this panel" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
</div>
</div>
<div class="ak-tabs" role="tablist">
<button class="ak-tab ak-active" data-tab="read" role="tab" title="Text-to-speech: read the page aloud, follow along, or pick a section">Read</button>
<button class="ak-tab" data-tab="visual" role="tab" title="Colour, contrast, focus ring and cursor size options">Visual</button>
<button class="ak-tab" data-tab="text" role="tab" title="Font size, dyslexia-friendly font, spacing and voice controls">Text</button>
<button class="ak-tab" data-tab="ai" role="tab" title="AI page summaries, text simplification and page Q&amp;A">AI</button>
<button class="ak-tab" data-tab="settings" role="tab" title="Mistral API key and keyboard shortcuts">Settings</button>
</div>
<div class="ak-body">

<div class="ak-section ak-visible" id="ak-tab-read">
<div class="ak-section-label">Screen Reader</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-read-page" title="Read the entire page aloud from the top, in one pass">Read Page</button>
<button class="ak-feat-btn" id="ak-read-progress-btn" title="Read paragraph by paragraph, auto-scrolling and highlighting as it goes, with a progress bar">With Progress</button>
<button class="ak-feat-btn" id="ak-read-section" title="Click any element on the page and only that element is read aloud">Pick Section</button>
<button class="ak-feat-btn ak-feat-stop" id="ak-stop-btn" title="Stop reading immediately">Stop</button>
</div>
<div class="ak-section-label">Page Tools</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-simplify" title="Strip ads, sidebars and clutter, leaving a clean, centred, easy-to-read column">Simplify</button>
<button class="ak-feat-btn" id="ak-ruler-btn" title="Show a horizontal guide that follows your cursor, to help track your place on the line">Ruler</button>
<button class="ak-feat-btn" id="ak-links-btn" title="Outline every link on the page in blue so clickable text stands out">Highlight Links</button>
<button class="ak-feat-btn" id="ak-heads-btn" title="Mark every heading with a coloured left border for faster scanning">Headings</button>
<button class="ak-feat-btn" id="ak-imgs-btn" title="Hide all images and videos on the page">Hide Images</button>
<button class="ak-feat-btn" id="ak-anim-btn" title="Freeze CSS animations and transitions site-wide, to reduce motion">Stop Anims</button>
</div>
<div class="ak-section-label">Zoom</div>
<div class="ak-btn-grid-3">
<button class="ak-feat-btn" id="ak-zoom-out" title="Zoom out 10%">A\u2212</button>
<button class="ak-feat-btn" id="ak-zoom-reset" title="Reset zoom to 100%">100%</button>
<button class="ak-feat-btn" id="ak-zoom-in" title="Zoom in 10%">A+</button>
</div>
<div class="ak-slider-row" style="margin-top:4px">
<label>Zoom</label>
<input type="range" id="ak-zoom-slider" min="0.5" max="3" step="0.1" value="1" title="Drag to set zoom from 50% to 300%">
<span class="ak-val" id="ak-zoom-val">100%</span>
</div>
</div>

<div class="ak-section" id="ak-tab-visual">
<div class="ak-section-label">Colour Mode</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-contrast-none" title="Turn off all colour filters and use the page's normal colours">Normal</button>
<button class="ak-feat-btn" id="ak-contrast-high" title="Maximum contrast: yellow text on black, cyan links">High Contrast</button>
<button class="ak-feat-btn" id="ak-contrast-dark" title="Invert and darken the page for a dark-mode look, even on light sites">Dark</button>
<button class="ak-feat-btn" id="ak-contrast-invert" title="Invert every colour on the page">Invert</button>
<button class="ak-feat-btn" id="ak-contrast-sepia" title="Warm, low-glare sepia tone to reduce eye strain">Sepia</button>
<button class="ak-feat-btn" id="ak-contrast-bw" title="Remove all colour, grayscale only">B&amp;W</button>
</div>
<div class="ak-section-label">Focus &amp; Cursor</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-focus-btn" title="Draw a thick, high-visibility outline around whatever has keyboard focus">Focus Ring</button>
<button class="ak-feat-btn" id="ak-cursor-btn" title="Cycle the mouse cursor size: normal \u2192 large \u2192 extra-large">Large Cursor</button>
</div>
</div>

<div class="ak-section" id="ak-tab-text">
<div class="ak-section-label">Font Size</div>
<div class="ak-font-control">
<button class="ak-font-btn" id="ak-font-down" title="Decrease page font size by 10%">A\u2212</button>
<div class="ak-font-display" id="ak-font-display">100%</div>
<button class="ak-font-btn" id="ak-font-up" title="Increase page font size by 10%">A+</button>
<button class="ak-font-btn" id="ak-font-reset" title="Reset font size to 100%">Reset</button>
</div>
<div class="ak-section-label">Font Style</div>
<button class="ak-wide-btn" id="ak-dyslexic-btn" title="Switch page and panel text to OpenDyslexic \u2014 a font with heavy-weighted letter bottoms designed to reduce letter confusion (b/d/p/q, n/u)">Dyslexia-Friendly Font</button>
<select class="ak-select" id="ak-voice-select" title="Choose which voice reads text aloud"><option value="">Default Voice</option></select>
<div class="ak-section-label">Line Spacing</div>
<div class="ak-spacing-control">
<button class="ak-spacing-btn ak-active" data-spacing="line-normal" title="Standard line height">Normal</button>
<button class="ak-spacing-btn" data-spacing="line-relaxed" title="1.8\xD7 line height for easier line tracking">Relaxed</button>
<button class="ak-spacing-btn" data-spacing="line-loose" title="2.2\xD7 line height, maximum breathing room">Loose</button>
</div>
<div class="ak-section-label">Letter Spacing</div>
<div class="ak-spacing-control">
<button class="ak-spacing-btn ak-active" data-spacing="letter-normal" title="Standard letter spacing">Normal</button>
<button class="ak-spacing-btn" data-spacing="letter-wide" title="Slightly wider letter spacing">Wide</button>
<button class="ak-spacing-btn" data-spacing="letter-wider" title="Maximum letter spacing, reduces crowding">Wider</button>
</div>
<div class="ak-section-label">Speech Speed</div>
<div class="ak-slider-row">
<label>Speed</label>
<input type="range" id="ak-rate" min="0.5" max="2" step="0.1" value="1" title="How fast text-to-speech reads, from 0.5\xD7 to 2\xD7">
<span class="ak-val" id="ak-rate-val">1.0\xD7</span>
</div>
<div class="ak-slider-row">
<label>Pitch</label>
<input type="range" id="ak-pitch" min="0.5" max="2" step="0.1" value="1" title="Voice pitch, lower or higher than default">
<span class="ak-val" id="ak-pitch-val">1.0</span>
</div>
<div class="ak-slider-row">
<label>Volume</label>
<input type="range" id="ak-vol" min="0" max="1" step="0.05" value="1" title="Text-to-speech playback volume">
<span class="ak-val" id="ak-vol-val">100%</span>
</div>
<button class="ak-wide-btn" id="ak-test-voice" style="margin-top:4px" title="Play a short sample sentence with the current voice, speed, pitch and volume">Test Voice</button>
</div>

<div class="ak-section" id="ak-tab-ai">
<div class="ak-section-label">AI Tools</div>
<button class="ak-wide-btn ak-primary" id="ak-summarize-btn" title="AI reads the page and speaks a 3\u20135 sentence summary aloud">Summarize This Page</button>
<div class="ak-summary-box" id="ak-summary-box"></div>
<button class="ak-wide-btn" id="ak-simplify-text-btn" title="Select text anywhere on the page first, then click this to rewrite it in plain language">Simplify Selected Text</button>
<div class="ak-summary-box" id="ak-simplified-box"></div>
<div class="ak-section-label">Page Q&amp;A</div>
<div class="ak-chat-msgs" id="ak-chat-msgs">
<div class="ak-chat-bubble ak-bot">Ask me anything about this page!</div>
</div>
<div class="ak-chat-input-row">
<input class="ak-chat-input" id="ak-chat-input" placeholder="Ask a question\u2026" autocomplete="off" title="Type a question about this page's content">
<button class="ak-chat-send" id="ak-chat-send" title="Send your question to the AI assistant">Ask</button>
</div>
</div>

<div class="ak-section" id="ak-tab-settings">
<div class="ak-section-label">Mistral API Key</div>
<div class="ak-api-row">
<input type="password" class="ak-api-input" id="ak-api-key" placeholder="Enter Mistral API key\u2026" title="Your key is stored only in this browser's local storage, never sent anywhere but Mistral">
<button class="ak-save-btn" id="ak-api-save" title="Save the API key locally to enable AI Summarize, Simplify and Q&amp;A">Save</button>
</div>
<div class="ak-status" id="ak-api-status">
<div class="ak-dot" id="ak-api-dot"></div>
<span class="ak-status-text" id="ak-api-text">No key set</span>
</div>
<div class="ak-section-label">Keyboard Shortcuts</div>
<div class="ak-shortcut-row">
<span class="ak-kbd">Alt + A</span><span style="font-size:11px;color:var(--ak-muted)">Open/Close</span>
</div>
<div class="ak-shortcut-row">
<span class="ak-kbd">Alt + R</span><span style="font-size:11px;color:var(--ak-muted)">Read Page</span>
</div>
<div class="ak-shortcut-row">
<span class="ak-kbd">Alt + S</span><span style="font-size:11px;color:var(--ak-muted)">Stop Reading</span>
</div>
<div class="ak-shortcut-row">
<span class="ak-kbd">Esc</span><span style="font-size:11px;color:var(--ak-muted)">Close Panel</span>
</div>
<div class="ak-section-label">About</div>
<p style="font-size:11px;color:var(--ak-muted);line-height:1.6">Accessibility Assistant \u2014 Free embeddable accessibility widget. Powered by Mistral AI. Drop one script tag on any website.</p>
</div>

</div>
</div>
<div id="ak-read-progress"><div id="ak-read-progress-fill"></div></div>
<div id="ak-read-progress-label"></div>
<div id="ak-ruler"></div>
<div id="ak-section-tip"></div>
<div id="ak-toast" role="status" aria-live="polite"></div>
</div>
`,u=document.createElement("div");u.id="ak-host",document.body.appendChild(u);const t=u.attachShadow({mode:"closed"}),g=document.createElement("link");g.rel="stylesheet",g.href=A(),t.appendChild(g);const x=document.createElement("div");x.innerHTML=z,t.appendChild(x),a.setRoot(t);try{const wc=window.__WIDGET_CONFIG__;wc&&wc.theme&&a.applyBrandTheme(wc.theme)}catch(e){}if(s.logoUrl){const lg=t.querySelector(".ak-logo");if(lg){const df=lg.innerHTML,db=lg.style.background;lg.innerHTML="";const im=document.createElement("img");im.src=s.logoUrl,im.alt="",im.style.cssText="width:100%;height:100%;object-fit:contain;border-radius:7px",im.onerror=()=>{lg.innerHTML=df,lg.style.background=db},lg.style.background="none",lg.appendChild(im)}}function B(){const e=t.getElementById("ak-voice-select");speechSynthesis.getVoices().filter(n=>n.lang.startsWith("en")).forEach(n=>{const l=document.createElement("option");l.value=n.name,l.textContent=n.name.replace(/\s*\(.*\)/,""),n.name===s.voice&&(l.selected=!0),e.appendChild(l)})}speechSynthesis.onvoiceschanged=B,setTimeout(B,500);const p=t.getElementById("ak-fab"),L=t.getElementById("ak-panel");let o=!1;function w(){o=!0,L.classList.add("ak-open"),p.setAttribute("aria-expanded","true")}function d(){o=!1,L.classList.remove("ak-open"),p.setAttribute("aria-expanded","false")}p.addEventListener("click",()=>{o?d():w()}),t.getElementById("ak-close-btn").addEventListener("click",d),document.addEventListener("keydown",e=>{e.altKey&&e.key==="a"&&(e.preventDefault(),o?d():w()),e.altKey&&e.key==="r"&&(e.preventDefault(),a.readPage()),e.altKey&&e.key==="s"&&(e.preventDefault(),a.stopSpeaking()),e.key==="Escape"&&o&&d()});const m=t.getElementById("ak-theme-btn");function S(){m.innerHTML=s.theme==="light"?I:M,m.title=s.theme==="light"?"Switch to dark theme":"Switch to light theme"}m.addEventListener("click",()=>{a.toggleTheme(),S()}),S(),t.querySelectorAll(".ak-tab").forEach(e=>{e.addEventListener("click",()=>{t.querySelectorAll(".ak-tab").forEach(n=>n.classList.remove("ak-active")),t.querySelectorAll(".ak-section").forEach(n=>n.classList.remove("ak-visible")),e.classList.add("ak-active");const i=t.getElementById("ak-tab-"+e.dataset.tab);i&&i.classList.add("ak-visible")})}),t.getElementById("ak-read-page").addEventListener("click",()=>a.readPage()),t.getElementById("ak-read-progress-btn").addEventListener("click",()=>a.readWithProgress()),t.getElementById("ak-read-section").addEventListener("click",()=>{d(),a.toggleSectionRead(),t.getElementById("ak-read-section").classList.toggle("ak-on")}),t.getElementById("ak-stop-btn").addEventListener("click",()=>a.stopSpeaking()),t.getElementById("ak-simplify").addEventListener("click",()=>a.simplifyPage()),t.getElementById("ak-ruler-btn").addEventListener("click",()=>{a.toggleRuler(),t.getElementById("ak-ruler-btn").classList.toggle("ak-on",s.rulerOn)}),t.getElementById("ak-links-btn").addEventListener("click",()=>{a.toggleHighlightLinks(),t.getElementById("ak-links-btn").classList.toggle("ak-on",s.highlightLinks)}),t.getElementById("ak-heads-btn").addEventListener("click",()=>{a.toggleHighlightHeadings(),t.getElementById("ak-heads-btn").classList.toggle("ak-on",s.highlightHeadings)}),t.getElementById("ak-imgs-btn").addEventListener("click",()=>{a.toggleHideImages(),t.getElementById("ak-imgs-btn").classList.toggle("ak-on",s.hideImages)}),t.getElementById("ak-anim-btn").addEventListener("click",()=>{a.toggleAnimations(),t.getElementById("ak-anim-btn").classList.toggle("ak-on",s.animationsOff)}),t.getElementById("ak-zoom-in").addEventListener("click",()=>{a.zoomIn(),c()}),t.getElementById("ak-zoom-out").addEventListener("click",()=>{a.zoomOut(),c()}),t.getElementById("ak-zoom-reset").addEventListener("click",()=>{a.zoomReset(),c()}),t.getElementById("ak-zoom-slider").addEventListener("input",e=>{a.setZoom(parseFloat(e.target.value)),c()});function c(){t.getElementById("ak-zoom-slider").value=s.zoomLevel,t.getElementById("ak-zoom-val").textContent=Math.round(s.zoomLevel*100)+"%",t.getElementById("ak-zoom-reset").textContent=Math.round(s.zoomLevel*100)+"%"}if(["none","high","dark","invert","sepia","bw"].forEach(e=>{const i=t.getElementById("ak-contrast-"+e);i&&i.addEventListener("click",()=>{a.setContrast(e),t.querySelectorAll('[id^="ak-contrast-"]').forEach(n=>n.classList.remove("ak-on")),i.classList.add("ak-on")})}),s.contrastMode&&s.contrastMode!=="none"){const e=t.getElementById("ak-contrast-"+s.contrastMode);e&&e.classList.add("ak-on")}t.getElementById("ak-focus-btn").addEventListener("click",()=>{a.toggleFocusRing(),t.getElementById("ak-focus-btn").classList.toggle("ak-on",s.focusRingOn)});const y=["normal","large","xl"],R={normal:"Large Cursor",large:"Cursor: Large",xl:"Cursor: X-Large"};let r=0;t.getElementById("ak-cursor-btn").addEventListener("click",()=>{r=(r+1)%y.length,a.setCursor(y[r]);const e=t.getElementById("ak-cursor-btn");e.classList.toggle("ak-on",r!==0),e.textContent=R[y[r]]}),t.getElementById("ak-font-up").addEventListener("click",()=>{a.fontUp(),k()}),t.getElementById("ak-font-down").addEventListener("click",()=>{a.fontDown(),k()}),t.getElementById("ak-font-reset").addEventListener("click",()=>{a.fontReset(),k()});function k(){t.getElementById("ak-font-display").textContent=s.fontSize+"%"}t.getElementById("ak-dyslexic-btn").addEventListener("click",()=>{a.toggleDyslexic(),t.getElementById("ak-dyslexic-btn").textContent=s.dyslexicOn?"Dyslexia Font: ON":"Dyslexia-Friendly Font",t.getElementById("ak-dyslexic-btn").classList.toggle("ak-on",s.dyslexicOn)}),t.getElementById("ak-voice-select").addEventListener("change",e=>{s.voice=e.target.value,a.save()}),t.querySelectorAll("[data-spacing]").forEach(e=>{e.addEventListener("click",()=>{const[i,n]=e.dataset.spacing.split("-"),l={line:"lineSpacing",letter:"letterSpacing"};l[i]&&(s[l[i]]=n,t.querySelectorAll(`[data-spacing^="${i}-"]`).forEach(b=>b.classList.remove("ak-active")),e.classList.add("ak-active"),a.applySpacing())})}),t.getElementById("ak-rate").addEventListener("input",e=>{s.rate=parseFloat(e.target.value),t.getElementById("ak-rate-val").textContent=s.rate.toFixed(1)+"\xD7",a.save()}),t.getElementById("ak-pitch").addEventListener("input",e=>{s.pitch=parseFloat(e.target.value),t.getElementById("ak-pitch-val").textContent=s.pitch.toFixed(1),a.save()}),t.getElementById("ak-vol").addEventListener("input",e=>{s.volume=parseFloat(e.target.value),t.getElementById("ak-vol-val").textContent=Math.round(s.volume*100)+"%",a.save()}),t.getElementById("ak-test-voice").addEventListener("click",()=>{a.speak("Hello! This is how I sound. Accessibility made easy with Accessibility Assistant.")}),t.getElementById("ak-summarize-btn").addEventListener("click",async()=>{const e=t.getElementById("ak-summary-box");e.textContent="Summarizing\u2026",e.classList.add("ak-visible");const i=await a.aiSummarize();e.textContent=i||"Could not summarize. Check your API key."}),t.getElementById("ak-simplify-text-btn").addEventListener("click",async()=>{var l,b;const e=(b=(l=window.getSelection())==null?void 0:l.toString())==null?void 0:b.trim();if(!e){a.toast("Select some text first");return}const i=t.getElementById("ak-simplified-box");i.textContent="Simplifying\u2026",i.classList.add("ak-visible");const n=await a.aiSimplifyText(e);i.textContent=n||"Error simplifying text.",n&&a.speak(n)});const h=t.getElementById("ak-chat-msgs"),E=t.getElementById("ak-chat-input");function v(e,i){const n=document.createElement("div");return n.className="ak-chat-bubble ak-"+i,n.textContent=e,h.appendChild(n),h.scrollTop=h.scrollHeight,n}async function C(){const e=E.value.trim();if(!e)return;E.value="",v(e,"user");const i=v("Thinking\u2026","thinking"),n=await a.aiAnswer(e,s.chatHistory);if(i.remove(),n.error){v("Error: "+n.error,"bot");return}v(n.text,"bot"),s.chatHistory.push({role:"user",content:e},{role:"assistant",content:n.text}),s.chatHistory.length>12&&s.chatHistory.splice(0,2)}t.getElementById("ak-chat-send").addEventListener("click",C),E.addEventListener("keydown",e=>{e.key==="Enter"&&C()}),t.getElementById("ak-api-save").addEventListener("click",()=>{const e=t.getElementById("ak-api-key").value.trim();s.mistralKey=e,a.save();const i=t.getElementById("ak-api-dot"),n=t.getElementById("ak-api-text");e?(i.className="ak-dot ak-ok",n.textContent="API key saved"):(i.className="ak-dot ak-err",n.textContent="No key set"),a.toast("API key saved")}),s.mistralKey&&(t.getElementById("ak-api-key").value=s.mistralKey,t.getElementById("ak-api-dot").className="ak-dot ak-ok",t.getElementById("ak-api-text").textContent="API key set"),t.getElementById("ak-reset-btn").addEventListener("click",()=>{confirm("Reset all accessibility settings?")&&(localStorage.removeItem("__ak_state"),location.reload())}),t.getElementById("ak-rate").value=s.rate||1,t.getElementById("ak-rate-val").textContent=(s.rate||1).toFixed(1)+"\xD7",t.getElementById("ak-pitch").value=s.pitch||1,t.getElementById("ak-pitch-val").textContent=(s.pitch||1).toFixed(1),t.getElementById("ak-vol").value=s.volume||1,t.getElementById("ak-vol-val").textContent=Math.round((s.volume||1)*100)+"%",c(),k(),a.applyAll()})();
