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
| **eslint-plugin-code-style (79 rules)** | https://github.com/Mohamed-Elhawary/eslint-plugin-code-style |
| **Local Config** | `eslint.config.js` |
| **Current Version** | `1.17.0` (check `package.json`) |

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
| | `interface-format` 🔧 | `*Interface` suffix |
| | `type-format` 🔧 | `*Type` suffix |
| | `enum-format` 🔧 | `*Enum` suffix, UPPER_SNAKE_CASE members |
| | `folder-based-naming-convention` 🔧 | Suffix by folder: `views/`→`*View`, `layouts/`→`*Layout`, `constants/`→`*Constants`, `data/`→`*Data`, `strings/`→`*Strings`, `services/`→`*Service`; chained names for nested files |
| | `svg-icon-naming-convention` | SVG → `*Icon` suffix |
| **Imports** | `absolute-imports-only` 🔧 ⚙️ | Use `@/` from index files; relative imports within same module folder |
| | `import-format` 🔧 | ≤3 inline, >3 multiline |
| | `inline-export-declaration` 🔧 ⚙️ | Use `export const x = ...` not grouped `export { x }` in non-index files |
| **Structure** | `folder-structure-consistency` ⚙️ | Flat vs wrapped must be consistent; no unnecessary wrapper folders |
| | `no-redundant-folder-suffix` | File/folder names must not repeat parent folder suffix |
| **Components** | `component-props-destructure` 🔧 | `({ prop })` not `(props)` |
| | `component-props-inline-type` 🔧 | Inline type annotations |
| **Hooks** | `hook-callback-format` 🔧 | Callback + deps on separate lines |
| | `hook-deps-per-line` 🔧 | ≤2 inline, >2 multiline |
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
