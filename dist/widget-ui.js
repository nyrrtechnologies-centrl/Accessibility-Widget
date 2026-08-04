(function(){"use strict";const a=window.__ak;if(!a)return;const s=a.S,f=document.currentScript;function C(){try{const e=f&&f.src;if(e)return e.replace(/widget-ui\.js(\?.*)?(#.*)?$/,"accessibility-widget.css")}catch(e){}return"accessibility-widget.css"}const M='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',I='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>',z=`
<div id="ak-shell" data-ak-theme="dark">
<button id="ak-fab" aria-label="Open Accessibility Assistant" title="Accessibility Assistant">
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
<button class="ak-icon-btn" id="ak-theme-btn" title="Toggle light / dark theme" aria-label="Toggle theme">${I}</button>
<button class="ak-icon-btn" id="ak-reset-btn" title="Reset all settings" aria-label="Reset all settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg></button>
<button class="ak-icon-btn" id="ak-close-btn" title="Close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
</div>
</div>
<div class="ak-tabs" role="tablist">
<button class="ak-tab ak-active" data-tab="read" role="tab">Read</button>
<button class="ak-tab" data-tab="visual" role="tab">Visual</button>
<button class="ak-tab" data-tab="text" role="tab">Text</button>
<button class="ak-tab" data-tab="ai" role="tab">AI</button>
<button class="ak-tab" data-tab="settings" role="tab">Settings</button>
</div>
<div class="ak-body">

<div class="ak-section ak-visible" id="ak-tab-read">
<div class="ak-section-label">Screen Reader</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-read-page">Read Page</button>
<button class="ak-feat-btn" id="ak-read-progress-btn">With Progress</button>
<button class="ak-feat-btn" id="ak-read-section">Pick Section</button>
<button class="ak-feat-btn ak-feat-stop" id="ak-stop-btn">Stop</button>
</div>
<div class="ak-section-label">Page Tools</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-simplify">Simplify</button>
<button class="ak-feat-btn" id="ak-ruler-btn">Ruler</button>
<button class="ak-feat-btn" id="ak-links-btn">Highlight Links</button>
<button class="ak-feat-btn" id="ak-heads-btn">Headings</button>
<button class="ak-feat-btn" id="ak-imgs-btn">Hide Images</button>
<button class="ak-feat-btn" id="ak-anim-btn">Stop Anims</button>
</div>
<div class="ak-section-label">Zoom</div>
<div class="ak-btn-grid-3">
<button class="ak-feat-btn" id="ak-zoom-out">A\u2212</button>
<button class="ak-feat-btn" id="ak-zoom-reset">100%</button>
<button class="ak-feat-btn" id="ak-zoom-in">A+</button>
</div>
<div class="ak-slider-row" style="margin-top:4px">
<label>Zoom</label>
<input type="range" id="ak-zoom-slider" min="0.5" max="3" step="0.1" value="1">
<span class="ak-val" id="ak-zoom-val">100%</span>
</div>
</div>

<div class="ak-section" id="ak-tab-visual">
<div class="ak-section-label">Colour Mode</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-contrast-none">Normal</button>
<button class="ak-feat-btn" id="ak-contrast-high">High Contrast</button>
<button class="ak-feat-btn" id="ak-contrast-dark">Dark</button>
<button class="ak-feat-btn" id="ak-contrast-invert">Invert</button>
<button class="ak-feat-btn" id="ak-contrast-sepia">Sepia</button>
<button class="ak-feat-btn" id="ak-contrast-bw">B&amp;W</button>
</div>
<div class="ak-section-label">Focus &amp; Cursor</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-focus-btn">Focus Ring</button>
<button class="ak-feat-btn" id="ak-cursor-btn">Large Cursor</button>
</div>
</div>

<div class="ak-section" id="ak-tab-text">
<div class="ak-section-label">Font Size</div>
<div class="ak-font-control">
<button class="ak-font-btn" id="ak-font-down">A\u2212</button>
<div class="ak-font-display" id="ak-font-display">100%</div>
<button class="ak-font-btn" id="ak-font-up">A+</button>
<button class="ak-font-btn" id="ak-font-reset" title="Reset">Reset</button>
</div>
<div class="ak-section-label">Font Style</div>
<button class="ak-wide-btn" id="ak-dyslexic-btn">Dyslexia-Friendly Font</button>
<select class="ak-select" id="ak-voice-select"><option value="">Default Voice</option></select>
<div class="ak-section-label">Line Spacing</div>
<div class="ak-spacing-control">
<button class="ak-spacing-btn ak-active" data-spacing="line-normal">Normal</button>
<button class="ak-spacing-btn" data-spacing="line-relaxed">Relaxed</button>
<button class="ak-spacing-btn" data-spacing="line-loose">Loose</button>
</div>
<div class="ak-section-label">Letter Spacing</div>
<div class="ak-spacing-control">
<button class="ak-spacing-btn ak-active" data-spacing="letter-normal">Normal</button>
<button class="ak-spacing-btn" data-spacing="letter-wide">Wide</button>
<button class="ak-spacing-btn" data-spacing="letter-wider">Wider</button>
</div>
<div class="ak-section-label">Speech Speed</div>
<div class="ak-slider-row">
<label>Speed</label>
<input type="range" id="ak-rate" min="0.5" max="2" step="0.1" value="1">
<span class="ak-val" id="ak-rate-val">1.0\xD7</span>
</div>
<div class="ak-slider-row">
<label>Pitch</label>
<input type="range" id="ak-pitch" min="0.5" max="2" step="0.1" value="1">
<span class="ak-val" id="ak-pitch-val">1.0</span>
</div>
<div class="ak-slider-row">
<label>Volume</label>
<input type="range" id="ak-vol" min="0" max="1" step="0.05" value="1">
<span class="ak-val" id="ak-vol-val">100%</span>
</div>
<button class="ak-wide-btn" id="ak-test-voice" style="margin-top:4px">Test Voice</button>
</div>

<div class="ak-section" id="ak-tab-ai">
<div class="ak-section-label">AI Tools</div>
<button class="ak-wide-btn ak-primary" id="ak-summarize-btn">Summarize This Page</button>
<div class="ak-summary-box" id="ak-summary-box"></div>
<button class="ak-wide-btn" id="ak-simplify-text-btn">Simplify Selected Text</button>
<div class="ak-summary-box" id="ak-simplified-box"></div>
<div class="ak-section-label">Page Q&amp;A</div>
<div class="ak-chat-msgs" id="ak-chat-msgs">
<div class="ak-chat-bubble ak-bot">Ask me anything about this page!</div>
</div>
<div class="ak-chat-input-row">
<input class="ak-chat-input" id="ak-chat-input" placeholder="Ask a question\u2026" autocomplete="off">
<button class="ak-chat-send" id="ak-chat-send">Ask</button>
</div>
</div>

<div class="ak-section" id="ak-tab-settings">
<div class="ak-section-label">Mistral API Key</div>
<div class="ak-api-row">
<input type="password" class="ak-api-input" id="ak-api-key" placeholder="Enter Mistral API key\u2026">
<button class="ak-save-btn" id="ak-api-save">Save</button>
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
`,u=document.createElement("div");u.id="ak-host",document.body.appendChild(u);const t=u.attachShadow({mode:"closed"}),g=document.createElement("link");g.rel="stylesheet",g.href=C(),t.appendChild(g);const x=document.createElement("div");x.innerHTML=z,t.appendChild(x),a.setRoot(t);try{const e=window.__WIDGET_CONFIG__;e&&e.theme&&a.applyBrandTheme(e.theme)}catch(e){}if(s.logoUrl){const e=t.querySelector(".ak-logo");if(e){const n=e.innerHTML,i=e.style.background;e.innerHTML="";const l=document.createElement("img");l.src=s.logoUrl,l.alt="",l.style.cssText="width:100%;height:100%;object-fit:contain;border-radius:7px",l.onerror=()=>{e.innerHTML=n,e.style.background=i},e.style.background="none",e.appendChild(l)}}function B(){const e=t.getElementById("ak-voice-select");speechSynthesis.getVoices().filter(n=>n.lang.startsWith("en")).forEach(n=>{const i=document.createElement("option");i.value=n.name,i.textContent=n.name.replace(/\s*\(.*\)/,""),n.name===s.voice&&(i.selected=!0),e.appendChild(i)})}speechSynthesis.onvoiceschanged=B,setTimeout(B,500);const m=t.getElementById("ak-fab"),L=t.getElementById("ak-panel");let o=!1;function w(){o=!0,L.classList.add("ak-open"),m.setAttribute("aria-expanded","true")}function d(){o=!1,L.classList.remove("ak-open"),m.setAttribute("aria-expanded","false")}m.addEventListener("click",()=>{o?d():w()}),t.getElementById("ak-close-btn").addEventListener("click",d),document.addEventListener("keydown",e=>{e.altKey&&e.key==="a"&&(e.preventDefault(),o?d():w()),e.altKey&&e.key==="r"&&(e.preventDefault(),a.readPage()),e.altKey&&e.key==="s"&&(e.preventDefault(),a.stopSpeaking()),e.key==="Escape"&&o&&d()});const p=t.getElementById("ak-theme-btn");function A(){p.innerHTML=s.theme==="light"?I:M,p.title=s.theme==="light"?"Switch to dark theme":"Switch to light theme"}p.addEventListener("click",()=>{a.toggleTheme(),A()}),A(),t.querySelectorAll(".ak-tab").forEach(e=>{e.addEventListener("click",()=>{t.querySelectorAll(".ak-tab").forEach(i=>i.classList.remove("ak-active")),t.querySelectorAll(".ak-section").forEach(i=>i.classList.remove("ak-visible")),e.classList.add("ak-active");const n=t.getElementById("ak-tab-"+e.dataset.tab);n&&n.classList.add("ak-visible")})}),t.getElementById("ak-read-page").addEventListener("click",()=>a.readPage()),t.getElementById("ak-read-progress-btn").addEventListener("click",()=>a.readWithProgress()),t.getElementById("ak-read-section").addEventListener("click",()=>{d(),a.toggleSectionRead(),t.getElementById("ak-read-section").classList.toggle("ak-on")}),t.getElementById("ak-stop-btn").addEventListener("click",()=>a.stopSpeaking()),t.getElementById("ak-simplify").addEventListener("click",()=>a.simplifyPage()),t.getElementById("ak-ruler-btn").addEventListener("click",()=>{a.toggleRuler(),t.getElementById("ak-ruler-btn").classList.toggle("ak-on",s.rulerOn)}),t.getElementById("ak-links-btn").addEventListener("click",()=>{a.toggleHighlightLinks(),t.getElementById("ak-links-btn").classList.toggle("ak-on",s.highlightLinks)}),t.getElementById("ak-heads-btn").addEventListener("click",()=>{a.toggleHighlightHeadings(),t.getElementById("ak-heads-btn").classList.toggle("ak-on",s.highlightHeadings)}),t.getElementById("ak-imgs-btn").addEventListener("click",()=>{a.toggleHideImages(),t.getElementById("ak-imgs-btn").classList.toggle("ak-on",s.hideImages)}),t.getElementById("ak-anim-btn").addEventListener("click",()=>{a.toggleAnimations(),t.getElementById("ak-anim-btn").classList.toggle("ak-on",s.animationsOff)}),t.getElementById("ak-zoom-in").addEventListener("click",()=>{a.zoomIn(),c()}),t.getElementById("ak-zoom-out").addEventListener("click",()=>{a.zoomOut(),c()}),t.getElementById("ak-zoom-reset").addEventListener("click",()=>{a.zoomReset(),c()}),t.getElementById("ak-zoom-slider").addEventListener("input",e=>{a.setZoom(parseFloat(e.target.value)),c()});function c(){t.getElementById("ak-zoom-slider").value=s.zoomLevel,t.getElementById("ak-zoom-val").textContent=Math.round(s.zoomLevel*100)+"%",t.getElementById("ak-zoom-reset").textContent=Math.round(s.zoomLevel*100)+"%"}if(["none","high","dark","invert","sepia","bw"].forEach(e=>{const n=t.getElementById("ak-contrast-"+e);n&&n.addEventListener("click",()=>{a.setContrast(e),t.querySelectorAll('[id^="ak-contrast-"]').forEach(i=>i.classList.remove("ak-on")),n.classList.add("ak-on")})}),s.contrastMode&&s.contrastMode!=="none"){const e=t.getElementById("ak-contrast-"+s.contrastMode);e&&e.classList.add("ak-on")}t.getElementById("ak-focus-btn").addEventListener("click",()=>{a.toggleFocusRing(),t.getElementById("ak-focus-btn").classList.toggle("ak-on",s.focusRingOn)});const y=["normal","large","xl"],R={normal:"Large Cursor",large:"Cursor: Large",xl:"Cursor: X-Large"};let r=0;t.getElementById("ak-cursor-btn").addEventListener("click",()=>{r=(r+1)%y.length,a.setCursor(y[r]);const e=t.getElementById("ak-cursor-btn");e.classList.toggle("ak-on",r!==0),e.textContent=R[y[r]]}),t.getElementById("ak-font-up").addEventListener("click",()=>{a.fontUp(),v()}),t.getElementById("ak-font-down").addEventListener("click",()=>{a.fontDown(),v()}),t.getElementById("ak-font-reset").addEventListener("click",()=>{a.fontReset(),v()});function v(){t.getElementById("ak-font-display").textContent=s.fontSize+"%"}t.getElementById("ak-dyslexic-btn").addEventListener("click",()=>{a.toggleDyslexic(),t.getElementById("ak-dyslexic-btn").textContent=s.dyslexicOn?"Dyslexia Font: ON":"Dyslexia-Friendly Font",t.getElementById("ak-dyslexic-btn").classList.toggle("ak-on",s.dyslexicOn)}),t.getElementById("ak-voice-select").addEventListener("change",e=>{s.voice=e.target.value,a.save()}),t.querySelectorAll("[data-spacing]").forEach(e=>{e.addEventListener("click",()=>{const[n,i]=e.dataset.spacing.split("-"),l={line:"lineSpacing",letter:"letterSpacing"};l[n]&&(s[l[n]]=i,t.querySelectorAll(`[data-spacing^="${n}-"]`).forEach(k=>k.classList.remove("ak-active")),e.classList.add("ak-active"),a.applySpacing())})}),t.getElementById("ak-rate").addEventListener("input",e=>{s.rate=parseFloat(e.target.value),t.getElementById("ak-rate-val").textContent=s.rate.toFixed(1)+"\xD7",a.save()}),t.getElementById("ak-pitch").addEventListener("input",e=>{s.pitch=parseFloat(e.target.value),t.getElementById("ak-pitch-val").textContent=s.pitch.toFixed(1),a.save()}),t.getElementById("ak-vol").addEventListener("input",e=>{s.volume=parseFloat(e.target.value),t.getElementById("ak-vol-val").textContent=Math.round(s.volume*100)+"%",a.save()}),t.getElementById("ak-test-voice").addEventListener("click",()=>{a.speak("Hello! This is how I sound. Accessibility made easy with Accessibility Assistant.")}),t.getElementById("ak-summarize-btn").addEventListener("click",async()=>{const e=t.getElementById("ak-summary-box");e.textContent="Summarizing\u2026",e.classList.add("ak-visible");const n=await a.aiSummarize();e.textContent=n||"Could not summarize. Check your API key."}),t.getElementById("ak-simplify-text-btn").addEventListener("click",async()=>{var e,n;const i=(n=(e=window.getSelection())==null?void 0:e.toString())==null?void 0:n.trim();if(!i){a.toast("Select some text first");return}const l=t.getElementById("ak-simplified-box");l.textContent="Simplifying\u2026",l.classList.add("ak-visible");const k=await a.aiSimplifyText(i);l.textContent=k||"Error simplifying text.",k&&a.speak(k)});const h=t.getElementById("ak-chat-msgs"),E=t.getElementById("ak-chat-input");function b(e,n){const i=document.createElement("div");return i.className="ak-chat-bubble ak-"+n,i.textContent=e,h.appendChild(i),h.scrollTop=h.scrollHeight,i}async function S(){const e=E.value.trim();if(!e)return;E.value="",b(e,"user");const n=b("Thinking\u2026","thinking"),i=await a.aiAnswer(e,s.chatHistory);if(n.remove(),i.error){b("Error: "+i.error,"bot");return}b(i.text,"bot"),s.chatHistory.push({role:"user",content:e},{role:"assistant",content:i.text}),s.chatHistory.length>12&&s.chatHistory.splice(0,2)}t.getElementById("ak-chat-send").addEventListener("click",S),E.addEventListener("keydown",e=>{e.key==="Enter"&&S()}),t.getElementById("ak-api-save").addEventListener("click",()=>{const e=t.getElementById("ak-api-key").value.trim();s.mistralKey=e,a.save();const n=t.getElementById("ak-api-dot"),i=t.getElementById("ak-api-text");e?(n.className="ak-dot ak-ok",i.textContent="API key saved"):(n.className="ak-dot ak-err",i.textContent="No key set"),a.toast("API key saved")}),s.mistralKey&&(t.getElementById("ak-api-key").value=s.mistralKey,t.getElementById("ak-api-dot").className="ak-dot ak-ok",t.getElementById("ak-api-text").textContent="API key set"),t.getElementById("ak-reset-btn").addEventListener("click",()=>{confirm("Reset all accessibility settings?")&&(localStorage.removeItem("__ak_state"),location.reload())}),t.getElementById("ak-rate").value=s.rate||1,t.getElementById("ak-rate-val").textContent=(s.rate||1).toFixed(1)+"\xD7",t.getElementById("ak-pitch").value=s.pitch||1,t.getElementById("ak-pitch-val").textContent=(s.pitch||1).toFixed(1),t.getElementById("ak-vol").value=s.volume||1,t.getElementById("ak-vol-val").textContent=Math.round((s.volume||1)*100)+"%",c(),v(),a.applyAll()})();
