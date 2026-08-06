-- ============================================================
-- AccessKit widget: theming columns
--
-- Table name: widget_clients (this is the table worker/verify.js queries
-- by client_id, and the table the dashboard's Widget tab reads/writes).
--
-- Delivery chain for every column below:
--   widget_clients.<column>
--     -> worker/verify.js  normalizeThemeConfig()  -> JSON "theme" object
--     -> public-embed/loader.js -> window.__WIDGET_CONFIG__.theme
--     -> src/widget-core.js applyBrandTheme() -> CSS custom properties on #ak-shell
--     -> src/accessibility-widget.css
-- ============================================================

-- 1. Preset. Matches BP in widget-core.js.
--    Add 'sunset' to this list if you want to expose the sunset preset —
--    widget-core.js already implements it, but the dashboard only offers the
--    four values below so the UI can never write a value this check rejects.
alter table widget_clients
  add column if not exists theme_preset text not null default 'default'
    check (theme_preset in ('default', 'ocean', 'midnight', 'custom'));

-- 2. Custom colours (hex, e.g. #0EA5E9). Nullable — theme_primary_color is
--    only required when theme_preset = 'custom'.
--    theme_bg_color drives the whole panel surface ramp: widget-core derives
--    bg2/bg3/bg4, text, muted, borders, header, tabs and control chrome from
--    it, so light and dark backgrounds both stay legible.
alter table widget_clients
  add column if not exists theme_bg_color text
    check (theme_bg_color is null or theme_bg_color ~* '^#[0-9a-f]{6}$');

alter table widget_clients
  add column if not exists theme_primary_color text
    check (theme_primary_color is null or theme_primary_color ~* '^#[0-9a-f]{6}$');

-- 3. Widget logo (replaces the default icon in the panel header).
alter table widget_clients
  add column if not exists theme_logo_url text;

-- 4. FAB / panel position on the page. All four are implemented in
--    accessibility-widget.css; anything else is ignored by the worker and the
--    widget falls back to bottom-right.
alter table widget_clients
  add column if not exists widget_position text not null default 'bottom-right'
    check (widget_position in ('bottom-right', 'bottom-left', 'top-right', 'top-left'));

-- 5. Guard rail: custom preset must actually supply a primary colour.
--    (add constraint has no "if not exists" — drop first so this file is re-runnable)
alter table widget_clients
  drop constraint if exists widget_clients_custom_theme_requires_primary;
alter table widget_clients
  add constraint widget_clients_custom_theme_requires_primary
  check (theme_preset <> 'custom' or theme_primary_color is not null);

-- ============================================================
-- 6. Advanced appearance columns.
--
-- theme_primary_color/theme_bg_color already drive an algorithmic ramp in
-- widget-core.js (shades, tints, on-brand text contrast). Everything below
-- is an optional override of one step in that ramp — leave null and the
-- widget keeps deriving it automatically from the primary/bg colour.
-- ============================================================

-- Lighter gradient stop used by the FAB, header logo tile and reading
-- progress bar (defaults to primary colour shaded +30% lighter).
alter table widget_clients
  add column if not exists theme_accent_light text
    check (theme_accent_light is null or theme_accent_light ~* '^#[0-9a-f]{6}$');

-- Hover/active shade of the primary colour (defaults to primary shaded -15% darker).
alter table widget_clients
  add column if not exists theme_accent_hover text
    check (theme_accent_hover is null or theme_accent_hover ~* '^#[0-9a-f]{6}$');

-- Text/icon colour drawn on top of accent-filled surfaces — the FAB icon,
-- primary button label, header logo glyph (defaults to auto black/white
-- contrast against the primary colour).
alter table widget_clients
  add column if not exists theme_button_text_color text
    check (theme_button_text_color is null or theme_button_text_color ~* '^#[0-9a-f]{6}$');

-- Fill colour for the secondary/feature button grid, selects and inputs
-- (--ak-control-bg) — the "Read Page", "Ruler", "Highlight Links" etc.
-- buttons, font-size and line-spacing controls. Independent of
-- theme_bg_color: without this set, that fill is just a shade of the panel
-- background, so buttons can't be given their own colour separate from the
-- surface they sit on. Set this to decouple the two.
alter table widget_clients
  add column if not exists theme_button_color text
    check (theme_button_color is null or theme_button_color ~* '^#[0-9a-f]{6}$');

-- Multiplier applied to every brand tint's alpha (soft/surface/border/glow
-- washes behind tabs, cards and focus rings). 1.0 = current default depth;
-- 0 removes tinting entirely; up to 2.0 doubles it.
alter table widget_clients
  add column if not exists theme_tint_strength numeric(3,2)
    check (theme_tint_strength is null or (theme_tint_strength >= 0 and theme_tint_strength <= 2));

-- Corner radius (px) for the panel and its buttons/inputs. Controls
-- --ak-r (panel/cards) directly; --ak-rs (buttons/inputs) is derived as 60%.
alter table widget_clients
  add column if not exists theme_border_radius smallint
    check (theme_border_radius is null or (theme_border_radius >= 0 and theme_border_radius <= 28));

-- Whether accent-filled surfaces (FAB, logo tile, primary button, progress
-- bar) render as a two-stop gradient (primary -> accent light) or a flat
-- single colour.
alter table widget_clients
  add column if not exists theme_button_style text
    check (theme_button_style is null or theme_button_style in ('gradient', 'solid'));

-- Panel font family. Falls back to 'Inter' (bundled) when null. Any font
-- the embedding page can resolve (web-safe name, or a family the client's
-- site already loads) — the widget does not fetch external font files for
-- this field, unlike the built-in OpenDyslexic toggle.
alter table widget_clients
  add column if not exists theme_font_family text;

-- Status colours used across the panel: save-confirmed dot / "Stop"
-- button accent / error text (theme_error_color), link-highlight colour
-- (theme_info_color). Default to the built-in green/red/blue when null.
alter table widget_clients
  add column if not exists theme_success_color text
    check (theme_success_color is null or theme_success_color ~* '^#[0-9a-f]{6}$');
alter table widget_clients
  add column if not exists theme_error_color text
    check (theme_error_color is null or theme_error_color ~* '^#[0-9a-f]{6}$');
alter table widget_clients
  add column if not exists theme_info_color text
    check (theme_info_color is null or theme_info_color ~* '^#[0-9a-f]{6}$');

-- ------------------------------------------------------------
-- Legacy column note
-- ------------------------------------------------------------
-- Earlier builds stored position in theme_position. The worker reads
-- widget_position first and falls back to theme_position, and the dashboard
-- writes whichever of the two exist, so both can coexist. Once every row is
-- migrated you can copy it across and drop the old column:
--
--   update widget_clients set widget_position = theme_position
--   where theme_position in ('bottom-right','bottom-left','top-right','top-left');
--
--   alter table widget_clients drop column theme_position;

-- ============================================================
-- Example row
-- ============================================================
-- update widget_clients
-- set theme_preset = 'custom',
--     theme_bg_color = '#0B0F1A',
--     theme_primary_color = '#6366F1',
--     theme_logo_url = 'https://cdn.example.com/logo.png',
--     widget_position = 'bottom-right',
--     theme_accent_light = '#8B8CF7',
--     theme_accent_hover = '#4F46E5',
--     theme_button_text_color = '#FFFFFF',
--     theme_button_color = '#1E1B4B',
--     theme_tint_strength = 1.25,
--     theme_border_radius = 14,
--     theme_button_style = 'gradient',
--     theme_font_family = 'Poppins',
--     theme_success_color = '#22C55E',
--     theme_error_color = '#EF4444',
--     theme_info_color = '#38BDF8'
-- where client_id = '...';

-- ============================================================
-- Shape worker/verify.js returns to the widget, built from these columns:
--
-- {
--   "valid": true,
--   "plan": "...",
--   "theme": {
--     "preset": "custom",                -- theme_preset
--     "customColor": "#6366F1",          -- theme_primary_color
--     "bgColor": "#0B0F1A",              -- theme_bg_color
--     "logoUrl": "https://...",          -- theme_logo_url
--     "position": "bottom-right",        -- widget_position
--     "accentLight": "#8B8CF7",          -- theme_accent_light
--     "accentHover": "#4F46E5",          -- theme_accent_hover
--     "buttonTextColor": "#FFFFFF",      -- theme_button_text_color
--     "buttonColor": "#1E1B4B",          -- theme_button_color
--     "tintStrength": 1.25,              -- theme_tint_strength
--     "borderRadius": 14,                -- theme_border_radius
--     "buttonStyle": "gradient",         -- theme_button_style
--     "fontFamily": "Poppins",           -- theme_font_family
--     "successColor": "#22C55E",         -- theme_success_color
--     "errorColor": "#EF4444",           -- theme_error_color
--     "infoColor": "#38BDF8"             -- theme_info_color
--   }
-- }
--
-- All eleven "advanced appearance" fields are optional overrides — any left
-- null/absent are derived automatically from theme_primary_color and
-- theme_bg_color exactly as before, so existing rows need no migration
-- beyond running the `alter table` statements above.
-- ============================================================
