// Accessibility Assistant Widget UI
(function(){
'use strict';
const ak = window.__ak;
if(!ak) return;
const S = ak.S;

// Resolve this widget's own CSS file, assuming it's co-located with
// this script (standard CDN embed pattern: one <script> tag pulls in
// both files). Falls back to a relative path if that can't be read.
const _thisScript = document.currentScript;
function resolveCssUrl(){
  try {
    const src = _thisScript && _thisScript.src;
    if(src) {
      const url = new URL(src, window.location.href);
      url.pathname = url.pathname.replace(/widget-ui\.js$/, 'accessibility-widget.css');
      return url.href;
    }
  } catch(e){}
  return 'accessibility-widget.css';
}

const SUN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';
const RESET_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>';
const CLOSE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

const HTML = `
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
<button class="ak-icon-btn" id="ak-theme-btn" title="Toggle light / dark theme" aria-label="Toggle theme">${MOON_ICON}</button>
<button class="ak-icon-btn" id="ak-reset-btn" title="Reset all settings" aria-label="Reset all settings">${RESET_ICON}</button>
<button class="ak-icon-btn" id="ak-close-btn" title="Close" aria-label="Close">${CLOSE_ICON}</button>
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
<button class="ak-feat-btn" id="ak-zoom-out">A−</button>
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
<button class="ak-font-btn" id="ak-font-down">A−</button>
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
<span class="ak-val" id="ak-rate-val">1.0×</span>
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
<input class="ak-chat-input" id="ak-chat-input" placeholder="Ask a question…" autocomplete="off">
<button class="ak-chat-send" id="ak-chat-send">Ask</button>
</div>
</div>

<div class="ak-section" id="ak-tab-settings">
<div class="ak-section-label">Mistral API Key</div>
<div class="ak-api-row">
<input type="password" class="ak-api-input" id="ak-api-key" placeholder="Enter Mistral API key…">
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
<p style="font-size:11px;color:var(--ak-muted);line-height:1.6">Accessibility Assistant — Free embeddable accessibility widget. Powered by Mistral AI. Drop one script tag on any website.</p>
</div>

</div>
</div>
<div id="ak-read-progress"><div id="ak-read-progress-fill"></div></div>
<div id="ak-read-progress-label"></div>
<div id="ak-ruler"></div>
<div id="ak-section-tip"></div>
<div id="ak-toast" role="status" aria-live="polite"></div>
</div>
`;

// ─── Mount inside a closed shadow root ─────────────────────
// A closed shadow root means the host page cannot even obtain a
// reference to the internal DOM (host.shadowRoot is null from the
// outside), and CSS defined inside this stylesheet targets #ak-shell
// — an element the page has no selector to reach. Together this
// means no website can restyle, retheme, or otherwise change how
// the widget looks; only this widget's own code controls that.
const host = document.createElement('div');
host.id = 'ak-host';
document.body.appendChild(host);
const root = host.attachShadow({ mode: 'closed' });

const linkEl = document.createElement('link');
linkEl.rel = 'stylesheet';
linkEl.href = resolveCssUrl();
root.appendChild(linkEl);

const wrap = document.createElement('div');
wrap.innerHTML = HTML;
root.appendChild(wrap);

ak.setRoot(root);

// Load voices
function loadVoices(){
  const sel = root.getElementById('ak-voice-select');
  const voices = speechSynthesis.getVoices().filter(v=>v.lang.startsWith('en'));
  voices.forEach(v=>{
    const o = document.createElement('option');
    o.value = v.name; o.textContent = v.name.replace(/\s*\(.*\)/,'');
    if(v.name === S.voice) o.selected = true;
    sel.appendChild(o);
  });
}
speechSynthesis.onvoiceschanged = loadVoices;
setTimeout(loadVoices, 500);

// Panel toggle
const fab = root.getElementById('ak-fab');
const panel = root.getElementById('ak-panel');
let panelOpen = false;
function openPanel(){ panelOpen=true; panel.classList.add('ak-open'); fab.setAttribute('aria-expanded','true'); }
function closePanel(){ panelOpen=false; panel.classList.remove('ak-open'); fab.setAttribute('aria-expanded','false'); }
fab.addEventListener('click', ()=>{ panelOpen ? closePanel() : openPanel(); });
root.getElementById('ak-close-btn').addEventListener('click', closePanel);
document.addEventListener('keydown', e=>{
  if(e.altKey && e.key==='a'){ e.preventDefault(); panelOpen?closePanel():openPanel(); }
  if(e.altKey && e.key==='r'){ e.preventDefault(); ak.readPage(); }
  if(e.altKey && e.key==='s'){ e.preventDefault(); ak.stopSpeaking(); }
  if(e.key==='Escape' && panelOpen) closePanel();
});

// Theme toggle
const themeBtn = root.getElementById('ak-theme-btn');
function syncThemeBtn(){
  themeBtn.innerHTML = S.theme === 'light' ? MOON_ICON : SUN_ICON;
  themeBtn.title = S.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
}
themeBtn.addEventListener('click', ()=>{ ak.toggleTheme(); syncThemeBtn(); });
syncThemeBtn();

// Tabs
root.querySelectorAll('.ak-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    root.querySelectorAll('.ak-tab').forEach(t=>t.classList.remove('ak-active'));
    root.querySelectorAll('.ak-section').forEach(s=>s.classList.remove('ak-visible'));
    tab.classList.add('ak-active');
    const sec = root.getElementById('ak-tab-'+tab.dataset.tab);
    if(sec) sec.classList.add('ak-visible');
  });
});

// Read tab
root.getElementById('ak-read-page').addEventListener('click', ()=>ak.readPage());
root.getElementById('ak-read-progress-btn').addEventListener('click', ()=>ak.readWithProgress());
root.getElementById('ak-read-section').addEventListener('click', ()=>{
  closePanel(); ak.toggleSectionRead();
  root.getElementById('ak-read-section').classList.toggle('ak-on');
});
root.getElementById('ak-stop-btn').addEventListener('click', ()=>ak.stopSpeaking());
root.getElementById('ak-simplify').addEventListener('click', ()=>ak.simplifyPage());

// Ruler
root.getElementById('ak-ruler-btn').addEventListener('click', ()=>{
  ak.toggleRuler();
  root.getElementById('ak-ruler-btn').classList.toggle('ak-on', S.rulerOn);
});

// Links / Headings / Images / Anims
root.getElementById('ak-links-btn').addEventListener('click', ()=>{
  ak.toggleHighlightLinks();
  root.getElementById('ak-links-btn').classList.toggle('ak-on', S.highlightLinks);
});
root.getElementById('ak-heads-btn').addEventListener('click', ()=>{
  ak.toggleHighlightHeadings();
  root.getElementById('ak-heads-btn').classList.toggle('ak-on', S.highlightHeadings);
});
root.getElementById('ak-imgs-btn').addEventListener('click', ()=>{
  ak.toggleHideImages();
  root.getElementById('ak-imgs-btn').classList.toggle('ak-on', S.hideImages);
});
root.getElementById('ak-anim-btn').addEventListener('click', ()=>{
  ak.toggleAnimations();
  root.getElementById('ak-anim-btn').classList.toggle('ak-on', S.animationsOff);
});

// Zoom
root.getElementById('ak-zoom-in').addEventListener('click', ()=>{ ak.zoomIn(); syncZoom(); });
root.getElementById('ak-zoom-out').addEventListener('click', ()=>{ ak.zoomOut(); syncZoom(); });
root.getElementById('ak-zoom-reset').addEventListener('click', ()=>{ ak.zoomReset(); syncZoom(); });
root.getElementById('ak-zoom-slider').addEventListener('input', e=>{
  ak.setZoom(parseFloat(e.target.value)); syncZoom();
});
function syncZoom(){
  root.getElementById('ak-zoom-slider').value = S.zoomLevel;
  root.getElementById('ak-zoom-val').textContent = Math.round(S.zoomLevel*100)+'%';
  root.getElementById('ak-zoom-reset').textContent = Math.round(S.zoomLevel*100)+'%';
}

// Contrast buttons
['none','high','dark','invert','sepia','bw'].forEach(mode=>{
  const btn = root.getElementById('ak-contrast-'+mode);
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    ak.setContrast(mode);
    root.querySelectorAll('[id^="ak-contrast-"]').forEach(b=>b.classList.remove('ak-on'));
    btn.classList.add('ak-on');
  });
});
if(S.contrastMode && S.contrastMode!=='none'){
  const b = root.getElementById('ak-contrast-'+S.contrastMode);
  if(b) b.classList.add('ak-on');
}

// Focus ring / Cursor
root.getElementById('ak-focus-btn').addEventListener('click', ()=>{
  ak.toggleFocusRing();
  root.getElementById('ak-focus-btn').classList.toggle('ak-on', S.focusRingOn);
});
const cursorSizes = ['normal','large','xl'];
const cursorLabels = { normal: 'Large Cursor', large: 'Cursor: Large', xl: 'Cursor: X-Large' };
let cursorIdx = 0;
root.getElementById('ak-cursor-btn').addEventListener('click', ()=>{
  cursorIdx = (cursorIdx+1) % cursorSizes.length;
  ak.setCursor(cursorSizes[cursorIdx]);
  const btn = root.getElementById('ak-cursor-btn');
  btn.classList.toggle('ak-on', cursorIdx!==0);
  btn.textContent = cursorLabels[cursorSizes[cursorIdx]];
});

// Text tab
root.getElementById('ak-font-up').addEventListener('click', ()=>{ ak.fontUp(); syncFont(); });
root.getElementById('ak-font-down').addEventListener('click', ()=>{ ak.fontDown(); syncFont(); });
root.getElementById('ak-font-reset').addEventListener('click', ()=>{ ak.fontReset(); syncFont(); });
function syncFont(){ root.getElementById('ak-font-display').textContent = S.fontSize+'%'; }

root.getElementById('ak-dyslexic-btn').addEventListener('click', ()=>{
  ak.toggleDyslexic();
  root.getElementById('ak-dyslexic-btn').textContent = S.dyslexicOn ? 'Dyslexia Font: ON' : 'Dyslexia-Friendly Font';
  root.getElementById('ak-dyslexic-btn').classList.toggle('ak-on', S.dyslexicOn);
});

root.getElementById('ak-voice-select').addEventListener('change', e=>{
  S.voice = e.target.value; ak.save();
});

// Spacing buttons
root.querySelectorAll('[data-spacing]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const [type, val] = btn.dataset.spacing.split('-');
    const map = { line: 'lineSpacing', letter: 'letterSpacing' };
    if(map[type]){
      S[map[type]] = val;
      root.querySelectorAll(`[data-spacing^="${type}-"]`).forEach(b=>b.classList.remove('ak-active'));
      btn.classList.add('ak-active');
      ak.applySpacing();
    }
  });
});

// Speech sliders
root.getElementById('ak-rate').addEventListener('input', e=>{
  S.rate = parseFloat(e.target.value);
  root.getElementById('ak-rate-val').textContent = S.rate.toFixed(1)+'×';
  ak.save();
});
root.getElementById('ak-pitch').addEventListener('input', e=>{
  S.pitch = parseFloat(e.target.value);
  root.getElementById('ak-pitch-val').textContent = S.pitch.toFixed(1);
  ak.save();
});
root.getElementById('ak-vol').addEventListener('input', e=>{
  S.volume = parseFloat(e.target.value);
  root.getElementById('ak-vol-val').textContent = Math.round(S.volume*100)+'%';
  ak.save();
});
root.getElementById('ak-test-voice').addEventListener('click', ()=>{
  ak.speak('Hello! This is how I sound. Accessibility made easy with Accessibility Assistant.');
});

// AI tab
root.getElementById('ak-summarize-btn').addEventListener('click', async ()=>{
  const box = root.getElementById('ak-summary-box');
  box.textContent = 'Summarizing…'; box.classList.add('ak-visible');
  const text = await ak.aiSummarize();
  box.textContent = text || 'Could not summarize. Check your API key.';
});
root.getElementById('ak-simplify-text-btn').addEventListener('click', async ()=>{
  const sel = window.getSelection()?.toString()?.trim();
  if(!sel){ ak.toast('Select some text first'); return; }
  const box = root.getElementById('ak-simplified-box');
  box.textContent = 'Simplifying…'; box.classList.add('ak-visible');
  const text = await ak.aiSimplifyText(sel);
  box.textContent = text || 'Error simplifying text.';
  if(text) ak.speak(text);
});

// Chat
const chatMsgs = root.getElementById('ak-chat-msgs');
const chatInput = root.getElementById('ak-chat-input');
function addBubble(text, role){
  const b = document.createElement('div');
  b.className = 'ak-chat-bubble ak-'+role;
  b.textContent = text;
  chatMsgs.appendChild(b);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
  return b;
}
async function sendChat(){
  const q = chatInput.value.trim(); if(!q) return;
  chatInput.value = '';
  addBubble(q, 'user');
  const thinking = addBubble('Thinking…', 'thinking');
  const res = await ak.aiAnswer(q, S.chatHistory);
  thinking.remove();
  if(res.error){ addBubble('Error: '+res.error, 'bot'); return; }
  addBubble(res.text, 'bot');
  S.chatHistory.push({role:'user',content:q},{role:'assistant',content:res.text});
  if(S.chatHistory.length > 12) S.chatHistory.splice(0,2);
}
root.getElementById('ak-chat-send').addEventListener('click', sendChat);
chatInput.addEventListener('keydown', e=>{ if(e.key==='Enter') sendChat(); });

// API key
root.getElementById('ak-api-save').addEventListener('click', ()=>{
  const key = root.getElementById('ak-api-key').value.trim();
  S.mistralKey = key; ak.save();
  const dot = root.getElementById('ak-api-dot');
  const txt = root.getElementById('ak-api-text');
  if(key){ dot.className='ak-dot ak-ok'; txt.textContent='API key saved'; }
  else { dot.className='ak-dot ak-err'; txt.textContent='No key set'; }
  ak.toast('API key saved');
});
if(S.mistralKey){
  root.getElementById('ak-api-key').value = S.mistralKey;
  root.getElementById('ak-api-dot').className = 'ak-dot ak-ok';
  root.getElementById('ak-api-text').textContent = 'API key set';
}

// Reset all
root.getElementById('ak-reset-btn').addEventListener('click', ()=>{
  if(!confirm('Reset all accessibility settings?')) return;
  localStorage.removeItem('__ak_state');
  location.reload();
});

// Restore slider values from saved state
root.getElementById('ak-rate').value = S.rate||1;
root.getElementById('ak-rate-val').textContent = (S.rate||1).toFixed(1)+'×';
root.getElementById('ak-pitch').value = S.pitch||1;
root.getElementById('ak-pitch-val').textContent = (S.pitch||1).toFixed(1);
root.getElementById('ak-vol').value = S.volume||1;
root.getElementById('ak-vol-val').textContent = Math.round((S.volume||1)*100)+'%';
syncZoom(); syncFont();

// Apply persisted state (includes theme)
ak.applyAll();
syncThemeBtn();
})();
