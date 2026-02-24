# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Version Format:** `MAJOR.MINOR.PATCH`
- **MAJOR:** Breaking changes, API changes, major redesigns, removed features
- **MINOR:** New features, pages, components (backward-compatible)
- **PATCH:** Bug fixes, minor tweaks, documentation updates

---

## [0.4.0] - 2026-02-25

**Error Boundary, Table UX Improvements & Theme Colors**

### Added

**Components**
- Create `BoundaryErrorClass` error boundary (class component) at `src/components/shared/error/boundary/`
- Wraps `RouterProvider` in `App.tsx` to catch render errors above the router scope

**Utilities**
- Create `src/utils/error.ts` with shared error helpers (`checkIsNetworkErrorHandler`, `getErrorMessageHandler`)
- Helpers are shared between `BoundaryErrorClass` (render errors) and `ErrorView` (route errors)

**Atoms**
- Add `Loader` atom with centered flex wrapper — always centers in parent container
- Add `LoaderSizeEnum` with `SM`, `MD`, `LG`, `XL` sizes
- Table atom renders "N/A" placeholder when `onRender` returns falsy content

**Theme**
- Add `--color-info` (`#3B82F6` / dark: `#60A5FA`) for edit actions
- Add `--color-gold` (`#B8860B` / dark: `#D4A017`) for suspend actions
- Add `--color-slate` (`#2C3E50` / dark: `#3A5068`) for permissions actions

**Constants**
- Add `emptyCell` to `labelsConstants` for table empty cell placeholder

### Changed

**Error Handling Architecture**
- Move error helpers from `boundary/` component to `src/utils/error.ts` (shared across components and views)
- `ErrorView` now imports helpers from `@/utils` instead of `@/components`
- Error handling layers: Zustand store (network offline) → ErrorBoundary (render errors above router) → `errorElement` (route errors) → try-catch (async/API errors)

**Table Actions**
- Replace hardcoded hex colors (`#2C3E50`, `#3B82F6`, `#B8860B`) with theme tokens (`bg-slate`, `bg-info`, `bg-gold`)
- Add smooth hover brightness effect (`hover:brightness-125 transition-all duration-200`) to action buttons

**Super Admins View**
- Type column returns `null` for empty `user_type` so table renders "N/A" placeholder

---

## [0.3.2] - 2026-02-25

**Sidebar Store, Hook Scope Separation & Accessibility Fixes**

### Added

**Hooks**
- Create `useDeleteRegion` hook for region deletion (matching `useDeleteSuperAdmin` pattern)

### Changed

**State Management**
- Replace `SidebarContext` + provider pattern with `useSidebarStore` Zustand store (simple state, no provider needed)
- Rename `SidebarContextInterface` to `SidebarStoreInterface`
- Simplify `DashboardLayout` — consume store directly, no context provider wrapping
- Replace `onSetNetworkError(error)` with `throw error` in hooks (`useRegionsList`, `useSuperAdminsList`, `useGetSuperAdmin`) so the route error boundary handles network errors
- Remove `<NetworkError />` overlay from `App.tsx` (handled by `ErrorView` route error boundary)

**Hook Scope**
- Remove `removeItemHandler` from `useSuperAdminsList` and `useRegionsList` — list hooks should only handle fetching
- Views now use dedicated delete hooks (`useDeleteSuperAdmin`, `useDeleteRegion`) and refetch after successful deletion

**Accessibility**
- Replace sidebar overlay `<div onClick>` with `<button>` element in `DashboardLayout` (SonarQube S6848/S1082)

### Removed

- Delete `src/contexts/sidebar.tsx` — replaced by Zustand store
- Delete `src/hooks/shared/use-sidebar.ts` — consumers use `useSidebarStore` directly
- Delete `src/store/network-error.ts` — no longer used
- Delete `NetworkErrorStoreInterface` from interfaces
- Remove `sidebarProviderRequired` constant (no provider to validate)

---

## [0.3.1] - 2026-02-24

**Reorganize Interfaces by Domain**

### Changed

**Interfaces**
- Move `CountryInterface`, `CountryListResponseInterface` from `super-admins.ts` to `common.ts` (generic, not domain-specific)
- Extract `RegionInterface`, `RegionListResponseInterface` into new `regions.ts` file
- Keep only admin and super-admin interfaces in `super-admins.ts`
- Update barrel exports in `index.ts` to reflect new file structure

---

## [0.3.0] - 2026-02-22

**Global Network Error Store with Zustand**

### Added

**State Management**
- Install `zustand` for simple global state management
- Create `src/store/` folder with barrel export
- Add `useNetworkErrorStore` zustand store for global network error handling
- Add `NetworkErrorStoreInterface` to `src/interfaces/common.ts`
- Render full-screen `<NetworkError />` overlay in `App.tsx` when store has error

**Documentation**
- Add "State Management" section to `CLAUDE.md` and `AGENTS.md` documenting Context+Provider vs Zustand pattern
- Add `store/` folder to project structure in `AGENTS.md`

### Changed

**Hooks**
- Replace local `networkError` state with global zustand store in `useSuperAdminsList`, `useGetSuperAdmin`, and `useRegionsList`
- Remove `networkError` from hook return objects

**Views**
- Remove `networkError` destructuring and `throw` from `RegionsAccessControlView` and `SuperAdminsAccessControlView`

### Dependencies

- `zustand` 5.0.11

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
- Add `.text-gradient` utility classes
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

[0.4.0]: https://github.com/hazem-rboua/Twindix-admin/releases/tag/v0.4.0
[0.3.2]: https://github.com/hazem-rboua/Twindix-admin/releases/tag/v0.3.2
[0.3.1]: https://github.com/hazem-rboua/Twindix-admin/releases/tag/v0.3.1
[0.3.0]: https://github.com/hazem-rboua/Twindix-admin/releases/tag/v0.3.0
[0.1.1]: https://github.com/hazem-rboua/Twindix-admin/releases/tag/v0.1.1
[0.1.0]: https://github.com/hazem-rboua/Twindix-admin/releases/tag/v0.1.0
