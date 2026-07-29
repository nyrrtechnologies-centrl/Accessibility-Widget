(function(){"use strict";const e=window.__ak;if(!e)return;const a=e.S,I=`
<button id="ak-fab" aria-label="Open Accessibility Widget" title="Accessibility">
<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
<circle cx="12" cy="5" r="1.5" fill="white" stroke="none"/>
<path d="M5 9l7 1 7-1M12 10v5M9 20l3-5 3 5"/>
</svg></button>
<div id="ak-fab-tooltip">Accessibility Widget</div>
<div id="ak-panel" role="dialog" aria-label="Accessibility Widget" aria-modal="true">
<div class="ak-header">
<div class="ak-header-left">
<div class="ak-logo"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="5" r="1.5" fill="white" stroke="none"/><path d="M5 9l7 1 7-1M12 10v5M9 20l3-5 3 5"/></svg></div>
<div><div class="ak-title">AccessKit</div><div class="ak-subtitle">Accessibility Widget</div></div>
</div>
<div class="ak-header-actions">
<button class="ak-icon-btn" id="ak-reset-btn" title="Reset all settings">\u21BA</button>
<button class="ak-icon-btn" id="ak-close-btn" title="Close" aria-label="Close">\u2715</button>
</div>
</div>
<div class="ak-tabs" role="tablist">
<button class="ak-tab ak-active" data-tab="read" role="tab"><span class="ak-tab-icon">\u{1F4D6}</span>Read</button>
<button class="ak-tab" data-tab="visual" role="tab"><span class="ak-tab-icon">\u{1F3A8}</span>Visual</button>
<button class="ak-tab" data-tab="text" role="tab"><span class="ak-tab-icon">\u{1F524}</span>Text</button>
<button class="ak-tab" data-tab="ai" role="tab"><span class="ak-tab-icon">\u{1F916}</span>AI</button>
<button class="ak-tab" data-tab="settings" role="tab"><span class="ak-tab-icon">\u2699\uFE0F</span>Settings</button>
</div>
<div class="ak-body">

<div class="ak-section ak-visible" id="ak-tab-read">
<div class="ak-section-label">\u{1F50A} Screen Reader</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-read-page"><span class="ak-feat-icon">\u25B6</span>Read Page</button>
<button class="ak-feat-btn" id="ak-read-progress-btn"><span class="ak-feat-icon">\u{1F4CA}</span>With Progress</button>
<button class="ak-feat-btn" id="ak-read-section"><span class="ak-feat-icon">\u{1F5B1}\uFE0F</span>Pick Section</button>
<button class="ak-feat-btn ak-feat-stop" id="ak-stop-btn"><span class="ak-feat-icon">\u23F9</span>Stop</button>
</div>
<div class="ak-section-label">\u{1F527} Page Tools</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-simplify"><span class="ak-feat-icon">\u2728</span>Simplify</button>
<button class="ak-feat-btn" id="ak-ruler-btn"><span class="ak-feat-icon">\u{1F4CF}</span>Ruler</button>
<button class="ak-feat-btn" id="ak-links-btn"><span class="ak-feat-icon">\u{1F517}</span>Highlight Links</button>
<button class="ak-feat-btn" id="ak-heads-btn"><span class="ak-feat-icon">\u{1F4CC}</span>Headings</button>
<button class="ak-feat-btn" id="ak-imgs-btn"><span class="ak-feat-icon">\u{1F5BC}\uFE0F</span>Hide Images</button>
<button class="ak-feat-btn" id="ak-anim-btn"><span class="ak-feat-icon">\u23F8\uFE0F</span>Stop Anims</button>
</div>
<div class="ak-section-label">\u{1F50D} Zoom</div>
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
<div class="ak-section-label">\u{1F3A8} Colour Mode</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-contrast-none">Normal</button>
<button class="ak-feat-btn" id="ak-contrast-high">\u26A1 High</button>
<button class="ak-feat-btn" id="ak-contrast-dark">\u{1F311} Dark</button>
<button class="ak-feat-btn" id="ak-contrast-invert">\u{1F504} Invert</button>
<button class="ak-feat-btn" id="ak-contrast-sepia">\u2615 Sepia</button>
<button class="ak-feat-btn" id="ak-contrast-bw">\u2B1B B&amp;W</button>
</div>
<div class="ak-section-label">\u{1F441}\uFE0F Focus &amp; Cursor</div>
<div class="ak-btn-grid">
<button class="ak-feat-btn" id="ak-focus-btn"><span class="ak-feat-icon">\u{1F3AF}</span>Focus Ring</button>
<button class="ak-feat-btn" id="ak-cursor-btn"><span class="ak-feat-icon">\u{1F5B1}\uFE0F</span>Large Cursor</button>
</div>
</div>

<div class="ak-section" id="ak-tab-text">
<div class="ak-section-label">\u{1F524} Font Size</div>
<div class="ak-font-control">
<button class="ak-font-btn" id="ak-font-down">A\u2212</button>
<div class="ak-font-display" id="ak-font-display">100%</div>
<button class="ak-font-btn" id="ak-font-up">A+</button>
<button class="ak-font-btn" id="ak-font-reset" title="Reset">\u21BA</button>
</div>
<div class="ak-section-label">\u{1F4DD} Font Style</div>
<button class="ak-wide-btn" id="ak-dyslexic-btn">\u{1F524} Dyslexia-Friendly Font</button>
<select class="ak-select" id="ak-voice-select"><option value="">Default Voice</option></select>
<div class="ak-section-label">\u2195\uFE0F Line Spacing</div>
<div class="ak-spacing-control">
<button class="ak-spacing-btn ak-active" data-spacing="line-normal">Normal</button>
<button class="ak-spacing-btn" data-spacing="line-relaxed">Relaxed</button>
<button class="ak-spacing-btn" data-spacing="line-loose">Loose</button>
</div>
<div class="ak-section-label">\u2194\uFE0F Letter Spacing</div>
<div class="ak-spacing-control">
<button class="ak-spacing-btn ak-active" data-spacing="letter-normal">Normal</button>
<button class="ak-spacing-btn" data-spacing="letter-wide">Wide</button>
<button class="ak-spacing-btn" data-spacing="letter-wider">Wider</button>
</div>
<div class="ak-section-label">\u{1F50A} Speech Speed</div>
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
<button class="ak-wide-btn" id="ak-test-voice" style="margin-top:4px">\u25B6 Test Voice</button>
</div>

<div class="ak-section" id="ak-tab-ai">
<div class="ak-section-label">\u2728 AI Tools</div>
<button class="ak-wide-btn ak-primary" id="ak-summarize-btn">\u{1F4CB} Summarize This Page</button>
<div class="ak-summary-box" id="ak-summary-box"></div>
<button class="ak-wide-btn" id="ak-simplify-text-btn">\u{1F504} Simplify Selected Text</button>
<div class="ak-summary-box" id="ak-simplified-box"></div>
<div class="ak-section-label">\u{1F4AC} Page Q&amp;A</div>
<div class="ak-chat-msgs" id="ak-chat-msgs">
<div class="ak-chat-bubble ak-bot">Ask me anything about this page!</div>
</div>
<div class="ak-chat-input-row">
<input class="ak-chat-input" id="ak-chat-input" placeholder="Ask a question\u2026" autocomplete="off">
<button class="ak-chat-send" id="ak-chat-send">Ask</button>
</div>
</div>

<div class="ak-section" id="ak-tab-settings">
<div class="ak-section-label">\u{1F511} Mistral API Key</div>
<div class="ak-api-row">
<input type="password" class="ak-api-input" id="ak-api-key" placeholder="Enter Mistral API key\u2026">
<button class="ak-save-btn" id="ak-api-save">Save</button>
</div>
<div class="ak-status" id="ak-api-status">
<div class="ak-dot" id="ak-api-dot"></div>
<span class="ak-status-text" id="ak-api-text">No key set</span>
</div>
<div class="ak-section-label">\u2328\uFE0F Keyboard Shortcuts</div>
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
<div class="ak-section-label">\u2139\uFE0F About</div>
<p style="font-size:11px;color:var(--ak-muted);line-height:1.6">AccessKit \u2014 Free embeddable accessibility widget. Powered by Mistral AI. Drop one script tag on any website.</p>
</div>

</div>
</div>
<div id="ak-read-progress"><div id="ak-read-progress-fill"></div></div>
<div id="ak-read-progress-label"></div>
<div id="ak-ruler"></div>
<div id="ak-section-tip"></div>
<div id="ak-toast" role="status" aria-live="polite"></div>
`,m=document.createElement("div");m.id="ak-host",document.body.appendChild(m),m.innerHTML=I;function g(){const t=document.getElementById("ak-voice-select");speechSynthesis.getVoices().filter(n=>n.lang.startsWith("en")).forEach(n=>{const i=document.createElement("option");i.value=n.name,i.textContent=n.name.replace(/\s*\(.*\)/,""),n.name===a.voice&&(i.selected=!0),t.appendChild(i)})}speechSynthesis.onvoiceschanged=g,setTimeout(g,500);const b=document.getElementById("ak-fab"),y=document.getElementById("ak-panel");let l=!1;function f(){l=!0,y.classList.add("ak-open"),b.setAttribute("aria-expanded","true")}function d(){l=!1,y.classList.remove("ak-open"),b.setAttribute("aria-expanded","false")}b.addEventListener("click",()=>{l?d():f()}),document.getElementById("ak-close-btn").addEventListener("click",d),document.addEventListener("keydown",t=>{t.altKey&&t.key==="a"&&(t.preventDefault(),l?d():f()),t.altKey&&t.key==="r"&&(t.preventDefault(),e.readPage()),t.altKey&&t.key==="s"&&(t.preventDefault(),e.stopSpeaking()),t.key==="Escape"&&l&&d()}),document.querySelectorAll(".ak-tab").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".ak-tab").forEach(n=>n.classList.remove("ak-active")),document.querySelectorAll(".ak-section").forEach(n=>n.classList.remove("ak-visible")),t.classList.add("ak-active");const s=document.getElementById("ak-tab-"+t.dataset.tab);s&&s.classList.add("ak-visible")})}),document.getElementById("ak-read-page").addEventListener("click",()=>e.readPage()),document.getElementById("ak-read-progress-btn").addEventListener("click",()=>e.readWithProgress()),document.getElementById("ak-read-section").addEventListener("click",()=>{d(),e.toggleSectionRead(),document.getElementById("ak-read-section").classList.toggle("ak-on")}),document.getElementById("ak-stop-btn").addEventListener("click",()=>e.stopSpeaking()),document.getElementById("ak-simplify").addEventListener("click",()=>e.simplifyPage()),document.getElementById("ak-ruler-btn").addEventListener("click",()=>{e.toggleRuler(),document.getElementById("ak-ruler-btn").classList.toggle("ak-on",a.rulerOn)}),document.getElementById("ak-links-btn").addEventListener("click",()=>{e.toggleHighlightLinks(),document.getElementById("ak-links-btn").classList.toggle("ak-on",a.highlightLinks)}),document.getElementById("ak-heads-btn").addEventListener("click",()=>{e.toggleHighlightHeadings(),document.getElementById("ak-heads-btn").classList.toggle("ak-on",a.highlightHeadings)}),document.getElementById("ak-imgs-btn").addEventListener("click",()=>{e.toggleHideImages(),document.getElementById("ak-imgs-btn").classList.toggle("ak-on",a.hideImages)}),document.getElementById("ak-anim-btn").addEventListener("click",()=>{e.toggleAnimations(),document.getElementById("ak-anim-btn").classList.toggle("ak-on",a.animationsOff)}),document.getElementById("ak-zoom-in").addEventListener("click",()=>{e.zoomIn(),c()}),document.getElementById("ak-zoom-out").addEventListener("click",()=>{e.zoomOut(),c()}),document.getElementById("ak-zoom-reset").addEventListener("click",()=>{e.zoomReset(),c()}),document.getElementById("ak-zoom-slider").addEventListener("input",t=>{e.setZoom(parseFloat(t.target.value)),c()});function c(){document.getElementById("ak-zoom-slider").value=a.zoomLevel,document.getElementById("ak-zoom-val").textContent=Math.round(a.zoomLevel*100)+"%",document.getElementById("ak-zoom-reset").textContent=Math.round(a.zoomLevel*100)+"%"}if(["none","high","dark","invert","sepia","bw"].forEach(t=>{const s=document.getElementById("ak-contrast-"+t);s&&s.addEventListener("click",()=>{e.setContrast(t),document.querySelectorAll('[id^="ak-contrast-"]').forEach(n=>n.classList.remove("ak-on")),s.classList.add("ak-on")})}),a.contrastMode&&a.contrastMode!=="none"){const t=document.getElementById("ak-contrast-"+a.contrastMode);t&&t.classList.add("ak-on")}document.getElementById("ak-focus-btn").addEventListener("click",()=>{e.toggleFocusRing(),document.getElementById("ak-focus-btn").classList.toggle("ak-on",a.focusRingOn)});const E=["normal","large","xl"];let o=0;document.getElementById("ak-cursor-btn").addEventListener("click",()=>{o=(o+1)%E.length,e.setCursor(E[o]),document.getElementById("ak-cursor-btn").classList.toggle("ak-on",o!==0),document.getElementById("ak-cursor-btn").querySelector("span").textContent=o===0?"\u{1F5B1}\uFE0F":o===1?"\u{1F50D}":"\u{1F50E}"}),document.getElementById("ak-font-up").addEventListener("click",()=>{e.fontUp(),k()}),document.getElementById("ak-font-down").addEventListener("click",()=>{e.fontDown(),k()}),document.getElementById("ak-font-reset").addEventListener("click",()=>{e.fontReset(),k()});function k(){document.getElementById("ak-font-display").textContent=a.fontSize+"%"}document.getElementById("ak-dyslexic-btn").addEventListener("click",()=>{e.toggleDyslexic(),document.getElementById("ak-dyslexic-btn").textContent=a.dyslexicOn?"\u2713 Dyslexia Font ON":"\u{1F524} Dyslexia-Friendly Font",document.getElementById("ak-dyslexic-btn").classList.toggle("ak-on",a.dyslexicOn)}),document.getElementById("ak-voice-select").addEventListener("change",t=>{a.voice=t.target.value,e.save()}),document.querySelectorAll("[data-spacing]").forEach(t=>{t.addEventListener("click",()=>{const[s,n]=t.dataset.spacing.split("-"),i={line:"lineSpacing",letter:"letterSpacing"};i[s]&&(a[i[s]]=n,document.querySelectorAll(`[data-spacing^="${s}-"]`).forEach(u=>u.classList.remove("ak-active")),t.classList.add("ak-active"),e.applySpacing())})}),document.getElementById("ak-rate").addEventListener("input",t=>{a.rate=parseFloat(t.target.value),document.getElementById("ak-rate-val").textContent=a.rate.toFixed(1)+"\xD7",e.save()}),document.getElementById("ak-pitch").addEventListener("input",t=>{a.pitch=parseFloat(t.target.value),document.getElementById("ak-pitch-val").textContent=a.pitch.toFixed(1),e.save()}),document.getElementById("ak-vol").addEventListener("input",t=>{a.volume=parseFloat(t.target.value),document.getElementById("ak-vol-val").textContent=Math.round(a.volume*100)+"%",e.save()}),document.getElementById("ak-test-voice").addEventListener("click",()=>{e.speak("Hello! This is how I sound. Accessibility made easy with AccessKit.")}),document.getElementById("ak-summarize-btn").addEventListener("click",async()=>{const t=document.getElementById("ak-summary-box");t.textContent="Summarizing\u2026",t.classList.add("ak-visible");const s=await e.aiSummarize();t.textContent=s||"Could not summarize. Check your API key."}),document.getElementById("ak-simplify-text-btn").addEventListener("click",async()=>{var i,u;const t=(u=(i=window.getSelection())==null?void 0:i.toString())==null?void 0:u.trim();if(!t){e.toast("Select some text first");return}const s=document.getElementById("ak-simplified-box");s.textContent="Simplifying\u2026",s.classList.add("ak-visible");const n=await e.aiSimplifyText(t);s.textContent=n||"Error simplifying text.",n&&e.speak(n)});const v=document.getElementById("ak-chat-msgs"),p=document.getElementById("ak-chat-input");function r(t,s){const n=document.createElement("div");return n.className="ak-chat-bubble ak-"+s,n.textContent=t,v.appendChild(n),v.scrollTop=v.scrollHeight,n}async function h(){const t=p.value.trim();if(!t)return;p.value="",r(t,"user");const s=r("Thinking\u2026","thinking"),n=await e.aiAnswer(t,a.chatHistory);if(s.remove(),n.error){r("Error: "+n.error,"bot");return}r(n.text,"bot"),a.chatHistory.push({role:"user",content:t},{role:"assistant",content:n.text}),a.chatHistory.length>12&&a.chatHistory.splice(0,2)}document.getElementById("ak-chat-send").addEventListener("click",h),p.addEventListener("keydown",t=>{t.key==="Enter"&&h()}),document.getElementById("ak-api-save").addEventListener("click",()=>{const t=document.getElementById("ak-api-key").value.trim();a.mistralKey=t,e.save();const s=document.getElementById("ak-api-dot"),n=document.getElementById("ak-api-text");t?(s.className="ak-dot ak-ok",n.textContent="API key saved \u2713"):(s.className="ak-dot ak-err",n.textContent="No key set"),e.toast("API key saved")}),a.mistralKey&&(document.getElementById("ak-api-key").value=a.mistralKey,document.getElementById("ak-api-dot").className="ak-dot ak-ok",document.getElementById("ak-api-text").textContent="API key set \u2713"),document.getElementById("ak-reset-btn").addEventListener("click",()=>{confirm("Reset all accessibility settings?")&&(localStorage.removeItem("__ak_state"),location.reload())}),document.getElementById("ak-rate").value=a.rate||1,document.getElementById("ak-rate-val").textContent=(a.rate||1).toFixed(1)+"\xD7",document.getElementById("ak-pitch").value=a.pitch||1,document.getElementById("ak-pitch-val").textContent=(a.pitch||1).toFixed(1),document.getElementById("ak-vol").value=a.volume||1,document.getElementById("ak-vol-val").textContent=Math.round((a.volume||1)*100)+"%",c(),k(),e.applyAll()})();
