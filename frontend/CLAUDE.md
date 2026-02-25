# Claude Code Configuration

> **SYNC REQUIREMENTS:**
> 1. **Folder Structure:** Keep in sync when creating/reorganizing folders
> 2. **ESLint Rules:** Keep "Must-Know Rules" table in sync with [eslint-plugin-code-style](https://github.com/Mohamed-Elhawary/eslint-plugin-code-style) when rules are added, removed, or updated

For full instructions, see [AGENTS.md](./AGENTS.md).

## Project

**Twindix Admin** — https://admin.twindix.com/

---

## ESLint (CRITICAL)

> **Read the full documentation before writing any code.**

| Resource | Link |
|----------|------|
| **eslint-plugin-code-style (81 rules)** | https://github.com/Mohamed-Elhawary/eslint-plugin-code-style |
| **Local Config** | `eslint.config.js` |
| **Current Version** | `2.2.2` (check `package.json`) |

**Always run `pnpm lint:fix` after making changes.**

> **VERSION SYNC:** When `eslint-plugin-code-style` version changes in `package.json`, agents MUST:
> 1. Fetch the plugin documentation to check for new/updated rules
> 2. Update rule counts in this file and `AGENTS.md`
> 3. Add any new rules to the "Must-Know Rules" table below

---

## Must-Know Rules (Quick Reference)

**Legend:** 🔧 Auto-fixable | ⚙️ Configurable

| Category | Rule | Requirement |
|----------|------|-------------|
| **Naming** | `function-naming-convention` 🔧 | camelCase + verb, `*Handler` suffix |
| | `use-state-naming-convention` 🔧 | Boolean: `is`/`has`/`with` prefix |
| | `interface-format` 🔧 | `*Interface` suffix; **verb-first ordering** (`CreateAdminInterface` not `AdminCreateInterface`) |
| | `type-format` 🔧 | `*Type` suffix |
| | `enum-format` 🔧 | `*Enum` suffix, UPPER_SNAKE_CASE members |
| | `folder-based-naming-convention` 🔧 ⚙️ | Suffix by folder: `views/`→`*View`, `layouts/`→`*Layout`, `constants/`→`*Constants`, `data/`→`*Data`, `strings/`→`*Strings`, `services/`→`*Service`; chained names for nested files; singularizes plural folder names; configurable `chainOrder` |
| | `svg-icon-naming-convention` | SVG → `*Icon` suffix |
| **Imports** | `absolute-imports-only` 🔧 ⚙️ | Use `@/` from index files; relative imports within same module folder |
| | `import-format` 🔧 | ≤3 inline, >3 multiline |
| | `inline-export-declaration` 🔧 ⚙️ | Use `export const x = ...` not grouped `export { x }` in non-index files |
| **Structure** | `folder-structure-consistency` ⚙️ | Flat vs wrapped must be consistent; no unnecessary wrapper folders; detects single-child nesting that should be flattened |
| | `no-redundant-folder-suffix` | File/folder names must not repeat parent folder suffix; exception for hook files (`use-*`) in `hooks/` |
| **Components** | `component-props-destructure` 🔧 | `({ prop })` not `(props)` |
| | `component-props-inline-type` 🔧 | Inline type annotations |
| **Hooks** | `hook-callback-format` 🔧 | Callback + deps on separate lines |
| | `hook-deps-per-line` 🔧 | ≤2 inline, >2 multiline |
| | `hook-file-naming-convention` 🔧 | Hook files in `hooks/` subfolders: `use-{verb}-{module-singular}` or `use-{module-plural}-list` |
| | `hook-function-naming-convention` 🔧 | Exported hook function name must match camelCase of file name (e.g., `use-create-super-admin.ts` → `useCreateSuperAdmin`) |
| | `react-code-order` 🔧 | refs → state → effects → handlers |
| **Arrays** | `array-items-per-line` 🔧 | ≤3 inline, >3 multiline |
| **JSX** | `jsx-simple-element-one-line` 🔧 | Simple children on one line |
| | `classname-order` 🔧 | Tailwind class ordering |
| **Strings** | `no-hardcoded-strings` ⚙️ | Import from `@/constants` |

See [AGENTS.md](./AGENTS.md) for full rules table or the [plugin docs](https://github.com/Mohamed-Elhawary/eslint-plugin-code-style).

---

## Component Architecture (CRITICAL)

> **Agents must follow this hierarchy when building UI.**

```
ui/  →  atoms/  →  components/  →  layouts/  →  views/
```

| Folder | Purpose |
|--------|---------|
| `ui/` | Raw Radix/shadcn components (auto-generated) |
| `atoms/` | Custom components with **project identity** (wrap `ui/`) |
| `components/` | Shared components with **multiple elements/logic** |
| `components/shared/` | Global UI: Navbar, Sidebar, Footer |
| `layouts/` | View layouts (DashboardLayout, AuthLayout) |
| `views/` | Full page UI (`*View` suffix) |

### Why Atoms?

Radix components have **nested imports** (Select has 7+ parts). Atoms:
1. **Collapse imports** - Wrap all parts in one file
2. **Apply identity** - Theme colors, radius `14px`, fonts
3. **Simplify usage** - Expose only needed props

```typescript
// ❌ Without atom: import 7 parts, style each time
import { Select, SelectContent, SelectItem, ... } from "@/ui/select";

// ✅ With atom: one import, pre-styled
import { Select } from "@/atoms";
<Select options={options} value={value} onChange={setValue} />
```

See [AGENTS.md](./AGENTS.md#component-architecture-critical) for full examples.

---

## State Management

| Pattern | When to Use | Examples |
|---------|-------------|----------|
| **React Context + Provider** | Complex grouped logic needing a dedicated provider file | `AuthProvider` (login/logout/refresh), `ThemeProvider` (toggle/persistence) |
| **Zustand stores** | Simple global state — just value + setter, no provider wrapper | Network error state, sidebar open/close |

- Stores live in `src/store/` with barrel export from `index.ts`
- Store interfaces live in `src/interfaces/`

---

## Error Handling

> **4 layers, each catching errors at a different scope.**

```
App.tsx
├── useNetworkErrorStore        → Layer 1: async network errors (offline)
├── BoundaryErrorClass          → Layer 2: render errors ABOVE the router
│   ├── ThemeProvider
│   ├── AuthProvider
│   ├── RouterProvider
│   │   └── errorElement={ErrorView}  → Layer 3: render errors INSIDE routes
│   │       └── Route components
│   │           └── hooks (try-catch)  → Layer 4: async/API errors
│   ├── Toaster
│   └── IndicatorNetworkError
```

| Layer | Component | Catches | Why needed |
|-------|-----------|---------|------------|
| 1 | `useNetworkErrorStore` (Zustand) | Async network errors in hooks | `throw` in async code doesn't reach error boundaries |
| 2 | `BoundaryErrorClass` | Sync render errors **above** router | If `AuthProvider` or `ThemeProvider` crashes, `errorElement` can't catch it |
| 3 | `ErrorView` (`errorElement`) | Sync render errors **inside** routes | React Router's built-in error boundary for route components |
| 4 | `try-catch` in hooks | All async errors | API failures, validation errors — shows toast or sets Zustand store |

### Key files

| File | Purpose |
|------|---------|
| `src/utils/error.ts` | Shared helpers (`checkIsNetworkErrorHandler`, `getErrorMessageHandler`) |
| `src/components/shared/error/boundary/` | `BoundaryErrorClass` — class component error boundary |
| `src/components/shared/error/network/` | `NetworkError` — full-screen offline UI |
| `src/components/shared/error/stack/` | `StackError` — full-screen error UI with details |
| `src/views/error/` | `ErrorView` — route `errorElement` (uses `useRouteError`) |
| `src/store/network-error.ts` | Zustand store for global network error state |

### Why async errors need Zustand (not error boundaries)

Error boundaries and `errorElement` only catch **synchronous** errors during rendering. Hooks fetch data with `async/await` inside `useEffect` — when an API call fails, `throw error` inside an async function becomes an **unhandled promise rejection**, not a render error. The Zustand store bridges this gap: hooks call `onSetNetworkError()` → `App.tsx` reads the store → renders `<NetworkError />`.

---

## Formatting Rules

| Rule | Value |
|------|-------|
| Indentation | 4 spaces |
| Quotes | Double |
| Semicolons | Required |
| Trailing commas | Required |
| Object keys | Sorted alphabetically |
| Files/Folders | kebab-case |

---

## Claude-Specific

- No `Co-Authored-By` in commits
- No Claude signature in commits
- Follow Conventional Commits: `feat(scope): subject`

---

## Version Management

The project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and the changelog format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

| Bump | When |
|------|------|
| PATCH | Bug fixes |
| MINOR | New features |
| MAJOR | Breaking changes |

Update both `package.json` and `CHANGELOG.md`.

---

## Documentation Sync

| Change | Update |
|--------|--------|
| Folder structure | AGENTS.md, CLAUDE.md |
| Version bump | package.json, CHANGELOG.md |
| eslint-plugin-code-style update | AGENTS.md (Rules Summary), CLAUDE.md (Must-Know Rules) |

---

## Design Tokens

```css
--color-primary: #1356BC
--color-primary-dark: #0025BA
--color-background: #F6F6F6
--color-surface: #FFFFFF
--color-error: #DC2626
--radius-default: 14px
```

---

## Reminders

- React 19, TypeScript 5, Tailwind 4, Vite 6
- Run `pnpm lint:fix` before commits
- Read eslint-plugin-code-style docs before coding
- Keep docs in sync with project structure
