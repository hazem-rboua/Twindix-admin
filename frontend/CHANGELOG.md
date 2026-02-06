# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Version Format:** `MAJOR.MINOR.PATCH`
- **MAJOR:** Breaking changes, API changes, major redesigns, removed features
- **MINOR:** New features, pages, components (backward-compatible)
- **PATCH:** Bug fixes, minor tweaks, documentation updates

---

## [0.1.1] - 2026-02-06

**Documentation Sync with eslint-plugin-code-style v1.15.0**

### Changed

**ESLint Documentation**
- Update rule count from 76 to 77 rules in `AGENTS.md` and `CLAUDE.md`
- Add current version reference (`1.15.0`) to ESLint sections
- Add VERSION SYNC instruction for automatic plugin documentation fetching when version changes

---

## [0.1.0] - 2026-02-05

**Initial Project Setup with PWA Support**

### Added

**Project Configuration**
- Initialize React 19 + TypeScript 5 + Vite 6 project
- Configure Tailwind CSS 4 with custom theme and design tokens
- Set up ESLint 9 flat config with 77 rules from `eslint-plugin-code-style`
- Add path alias `@/` for absolute imports

**PWA Support**
- Add `vite-plugin-pwa` with auto-update service worker
- Create `manifest.webmanifest` with theme colors and icons
- Add `offline.html` fallback page for offline mode
- Configure Google Fonts runtime caching (1-year expiration)

**Favicon & Meta**
- Add `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`
- Configure theme color `#0025BA` across all meta tags
- Add Open Graph and Twitter Card meta tags

**Design Tokens**
- Define color palette: primary (`#1356BC`), primary-dark (`#0025BA`), background (`#F6F6F6`)
- Set default border radius: `14px`
- Configure Roboto font family (weights: 300, 400, 500, 700)

**Styling**
- Add `.text-gradient` and `.text-gradient-error` utility classes
- Configure font smoothing for cross-browser consistency

**Documentation**
- Create `AGENTS.md` with AI agent instructions
- Create `CLAUDE.md` with Claude-specific configuration
- Create `CHANGELOG.md` for version tracking

**Package Metadata**
- Add repository, bugs, homepage URLs to package.json
- Add keywords for discoverability

### Dependencies

**Production**
- `@radix-ui/react-avatar` - Avatar component
- `@radix-ui/react-dialog` - Modal dialogs
- `@radix-ui/react-dropdown-menu` - Dropdown menus
- `@radix-ui/react-icons` - Icon set
- `@radix-ui/react-toast` - Toast notifications
- `axios` - HTTP client
- `react` / `react-dom` - React 19
- `react-markdown` - Markdown rendering
- `react-router-dom` - Client-side routing

**Development**
- `vite-plugin-pwa` - PWA support
- `tailwindcss` / `@tailwindcss/vite` - Tailwind CSS 4
- `typescript` - TypeScript 5
- `eslint` + plugins - Code linting
- `@vitejs/plugin-react` - React Fast Refresh

---

[0.1.1]: https://github.com/hazem-rboua/Twindix-admin/releases/tag/v0.1.1
[0.1.0]: https://github.com/hazem-rboua/Twindix-admin/releases/tag/v0.1.0
