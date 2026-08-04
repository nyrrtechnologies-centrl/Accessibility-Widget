# ♿ Accessibility Widget (AccessKit)

> A lightweight, dependency-free, embeddable accessibility widget for any website. Packed with Text-to-Speech, AI Page Summaries, Dyslexia-friendly fonts, Reading Ruler, Zoom, High Contrast Modes, Page Q&A, and interactive text controls.

![Accessibility Widget Demo](demo.html)

---

## ✨ Features

- 🔊 **Text-to-Speech (Read Aloud)**: Full page or paragraph-by-paragraph reading with adjustable speed, pitch, and voice selection.
- 📊 **Reading Progress Bar**: Live progress tracking and auto-scrolling paragraph by paragraph.
- 🖱️ **Pick Section**: Click any element on the page to read it aloud immediately.
- 📏 **Reading Ruler**: Focus line that follows the cursor to assist readers with dyslexia or tracking difficulties.
- 🤖 **AI Summaries & Page Q&A**: Powered by Mistral AI — condenses any web page into 3–5 key sentences or answers custom questions about page content.
- 🔤 **Dyslexia Font & Spacing**: OpenDyslexic font support with customizable line, word, and letter spacing.
- 🎨 **Contrast Modes**: High Contrast Yellow-on-Black, Inverted, Sepia, Dark Mode, and Greyscale.
- 🔍 **Zoom & Font Controls**: Smooth zoom scaling (50% – 300%) and independent font size adjustments.
- 🔗 **Visual Accessibility Aids**: Highlight links, heading markers, hide images, freeze animations, enhanced focus rings, and custom large cursors.
- 💾 **Persistent Settings**: All user preferences saved automatically in `localStorage`.

---

## 🚀 Quick Start & Integration

Add the following lines before the closing `</body>` tag of your HTML page:

```html
<!-- Accessibility Widget CSS -->
<link rel="stylesheet" href="accessibility-widget.css">

<!-- Accessibility Widget Engine & UI -->
<script src="widget-core.js"></script>
<script src="widget-ui.js"></script>
```

---

## 📁 Repository Structure

```
accessibility-widget/
├── accessibility-widget.css  # Modern UI & widget styling
├── widget-core.js            # Accessibility features & Speech/AI engine
├── widget-ui.js              # Floating Action Button & UI Panel
└── demo.html                 # Interactive demonstration page
```

---

## 🎨 Per-client theming

Licensed embeds are themed from the `widget_clients` row — no per-client CSS or
re-embed. Run [`sql/widget-theming.sql`](sql/widget-theming.sql) once, then set the
columns from the dashboard's **Widget** tab.

| Column | What it changes |
| --- | --- |
| `theme_preset` | Accent preset: `default` / `ocean` / `midnight` / `custom` |
| `theme_primary_color` | Accent hex when preset is `custom` (required by a DB check) |
| `theme_bg_color` | Panel surface. Backgrounds, text, borders, tabs and control chrome are all derived from it for contrast |
| `theme_logo_url` | Image replacing the default icon in the panel header |
| `widget_position` | `bottom-right` / `bottom-left` / `top-right` / `top-left` |

The chain is: column → `worker/verify.js` (`normalizeThemeConfig`) → `theme` JSON →
`public-embed/loader.js` → `window.__WIDGET_CONFIG__.theme` → `applyBrandTheme()` in
`widget-core.js` → CSS custom properties on `#ak-shell`. Adding a new themable
property means touching all four. **Changes to `worker/verify.js` need a Wrangler
deploy, and `dist/` needs `npm run build` plus a CDN publish, before clients see them.**

---

## 🤖 AI Setup (Optional)

To enable AI Summarization, Simplified Text, and Page Q&A:
1. Open the widget panel on your website.
2. Go to the **Settings** tab.
3. Enter your **Mistral API Key**.
4. Settings are saved locally on your device.

---

## 📄 License

MIT License. Free for personal and commercial projects.
