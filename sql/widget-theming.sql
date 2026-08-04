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
--     widget_position = 'bottom-right'
-- where client_id = '...';

-- ============================================================
-- Shape worker/verify.js returns to the widget, built from these columns:
--
-- {
--   "valid": true,
--   "plan": "...",
--   "theme": {
--     "preset": "custom",           -- theme_preset
--     "customColor": "#6366F1",     -- theme_primary_color
--     "bgColor": "#0B0F1A",         -- theme_bg_color
--     "logoUrl": "https://...",     -- theme_logo_url
--     "position": "bottom-right"    -- widget_position
--   }
-- }
-- ============================================================
