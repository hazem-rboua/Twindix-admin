# AGENTS.md

Instructions for AI coding agents working with this codebase.

> **SYNC REQUIREMENTS:**
> 1. **Folder Structure:** Keep "Project Structure" section in sync when creating/reorganizing folders
> 2. **ESLint Rules:** Keep "Rules Summary" section in sync with [eslint-plugin-code-style](https://github.com/Mohamed-Elhawary/eslint-plugin-code-style) when rules are added, removed, or updated
>
> The same applies to `CLAUDE.md`.

## Project Overview

**Twindix Admin** is the admin panel for the Twindix platform — manage assessments, enrollments, orders, benchmarks, packages, templates, discounts, and access control.

- **Live URL:** https://admin.twindix.com/
- **Repository:** https://github.com/hazem-rboua/Twindix-admin

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 6.x | Build tool & dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| Radix UI | Latest | Accessible UI primitives |
| ESLint | 9.x | Code linting (flat config) |

## Project Structure

> **SYNC:** Update this section whenever the folder structure changes.

```
frontend/
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── offline.html           # PWA offline fallback
│   └── _redirects             # Netlify redirects
├── src/
│   ├── api/                   # API client functions
│   ├── atoms/                 # Custom UI components (project identity, wraps ui/)
│   ├── components/            # Shared components with logic (shared/ subfolder for global UI)
│   ├── constants/             # App constants and configuration
│   ├── contexts/              # React context providers
│   ├── data/                  # Static data
│   ├── enums/                 # TypeScript enums
│   ├── hooks/                 # Custom React hooks
│   ├── interfaces/            # TypeScript interfaces
│   ├── layouts/               # View layouts (DashboardLayout, AuthLayout, etc.)
│   ├── routes/                # Route configuration (createBrowserRouter)
│   ├── services/              # Business logic & API services
│   ├── strings/               # UI text strings (for i18n)
│   ├── types/                 # TypeScript type aliases
│   ├── ui/                    # Radix/shadcn raw components (auto-generated)
│   ├── utils/                 # Utility functions
│   ├── views/                 # Full page UI components (*View suffix)
│   ├── app.tsx                # Root application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles & Tailwind theme
├── scripts/                   # Build scripts
├── eslint.config.js           # ESLint flat config
├── vite.config.ts             # Vite configuration with PWA
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies & scripts
├── AGENTS.md                  # AI agent instructions (this file)
├── CLAUDE.md                  # Claude-specific configuration
└── CHANGELOG.md               # Version history
```

---

## Component Architecture (CRITICAL)

> **Agents must understand and follow this architecture when building UI.**

### Folder Hierarchy

```
ui/  →  atoms/  →  components/  →  layouts/  →  views/
```

| Folder | Purpose | Examples |
|--------|---------|----------|
| `ui/` | Raw Radix/shadcn components (auto-generated via CLI) | `select.tsx`, `dialog.tsx`, `button.tsx` |
| `atoms/` | Custom components with **project identity** (wraps `ui/`) | `Select`, `Button`, `Input`, `Dialog` |
| `components/` | Shared components with **multiple elements/logic** | `UserCard`, `DataTable`, `SearchFilter` |
| `components/shared/` | Global shared UI (Navbar, Sidebar, Footer) | `Navbar`, `Sidebar`, `Footer` |
| `layouts/` | View layout structures (wrap views with shared UI) | `DashboardLayout`, `AuthLayout` |
| `views/` | Full page UI (must end with `*View` suffix) | `DashboardView`, `UsersView`, `LoginView` |

### Why Atoms? (Radix Component Wrapping)

Radix/shadcn components have **multiple nested imports** that lead to:
- Redundant imports in every file
- No project identity (default styles)
- Repetitive customization

**Example Problem - Radix Select:**

```typescript
// ❌ Bad - importing all parts every time
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/ui/select";

// Then manually styling each time...
<Select>
    <SelectTrigger className="w-full rounded-[14px] border-primary...">
        <SelectValue placeholder="Select..." />
    </SelectTrigger>
    <SelectContent className="rounded-[14px]...">
        ...
    </SelectContent>
</Select>
```

**Solution - Create an Atom:**

```typescript
// ✅ Good - atoms/select.tsx
// Wraps all imports, applies project identity once

import {
    Select as SelectRoot,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/ui/select";

interface SelectOptionInterface {
    label: string;
    value: string;
}

export const Select = ({
    isDisabled = false,
    label,
    options,
    placeholder = "Select...",
    value,
    onChange,
}: {
    isDisabled?: boolean;
    label?: string;
    options: SelectOptionInterface[];
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
}) => (
    <SelectRoot
        disabled={isDisabled}
        value={value}
        onValueChange={onChange}
    >
        <SelectTrigger className="w-full rounded-[14px] border-primary bg-surface">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-[14px] border-primary bg-surface">
            {label && (
                <SelectGroup>
                    <SelectLabel className="text-text-secondary">
                        {label}
                    </SelectLabel>
                </SelectGroup>
            )}
            {options.map(({ label, value }) => (
                <SelectItem
                    className="cursor-pointer hover:bg-background"
                    key={value}
                    value={value}
                >
                    {label}
                </SelectItem>
            ))}
        </SelectContent>
    </SelectRoot>
);
```

**Usage - Clean and Simple:**

```typescript
// ✅ In any component or view
import { Select } from "@/atoms";

<Select
    options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
    ]}
    placeholder="Select role"
    value={role}
    onChange={setRole}
/>
```

### Atom Guidelines

1. **One atom per UI primitive:** `Button`, `Input`, `Select`, `Dialog`
2. **No suffix required:** Just the component name (not `ButtonAtom`)
3. **Apply project identity:** Theme colors, radius `14px`, fonts
4. **Collapse all nested imports:** Wrap all sub-components internally
5. **Expose simple props:** Hide complexity, expose only what's needed
6. **Export from index:** `atoms/index.ts` re-exports all atoms

### When to Use Each Folder

| Building... | Use |
|-------------|-----|
| Wrapping a Radix/UI component with project styles | `atoms/` |
| Small, single-purpose styled element | `atoms/` |
| Navbar, Sidebar, Footer (global shared UI) | `components/shared/` |
| Component with business logic or multiple atoms | `components/` |
| Reusable component used across views | `components/` |
| View wrapper with shared UI (Sidebar + Navbar + content) | `layouts/` |
| Full page content | `views/` |

---

## ESLint Configuration (CRITICAL)

> **MANDATORY:** All code must pass ESLint. Run `pnpm lint:fix` before every commit.

### eslint-plugin-code-style

**79 custom rules** (70 auto-fixable 🔧, 19 configurable ⚙️, 9 report-only) for consistent React/TypeScript formatting.

| Resource | Link |
|----------|------|
| **Full Documentation** | https://github.com/Mohamed-Elhawary/eslint-plugin-code-style |
| **NPM Package** | https://www.npmjs.com/package/eslint-plugin-code-style |
| **Local Config** | `eslint.config.js` |
| **Current Version** | `1.17.0` (check `package.json`) |

> **Read the full documentation before implementing any code.** The table below is a quick reference.

> **VERSION SYNC:** When `eslint-plugin-code-style` version changes in `package.json`, agents MUST:
> 1. Fetch the plugin documentation to check for new/updated rules
> 2. Update rule counts in this file and `CLAUDE.md`
> 3. Add any new rules to the "Rules Summary" section

---

## Rules Summary (Quick Reference)

**Legend:** 🔧 Auto-fixable | ⚙️ Configurable

### Array Rules
| Rule | Description |
|------|-------------|
| `array-callback-destructure` 🔧 | Destructured params in callbacks go multiline when ≥2 properties |
| `array-items-per-line` 🔧 ⚙️ | ≤3 items inline; >3 each on own line |
| `array-objects-on-new-lines` 🔧 | Each object in array starts on its own line |

### Arrow Function Rules
| Rule | Description |
|------|-------------|
| `arrow-function-block-body` 🔧 | Wrap multiline arrow expressions in parentheses |
| `arrow-function-simple-jsx` 🔧 | Collapse simple single-element JSX returns to one line |
| `arrow-function-simplify` 🔧 | Convert block body with single return to implicit return |
| `curried-arrow-same-line` 🔧 | Curried arrows start on same line as `=>` |

### Component Rules
| Rule | Description |
|------|-------------|
| `component-props-destructure` 🔧 | Props must be destructured `({ prop })` not `(props)` |
| `component-props-inline-type` 🔧 | Inline type annotation with proper spacing |
| `folder-based-naming-convention` 🔧 | Suffix by folder: `views/`→`*View`, `layouts/`→`*Layout`, `constants/`→`*Constants`, `data/`→`*Data`, `strings/`→`*Strings`, `services/`→`*Service`; chained folder names for nested files |
| `folder-structure-consistency` ⚙️ | Enforce flat vs wrapped folder consistency in module folders; no unnecessary wrappers |
| `no-redundant-folder-suffix` | Disallow file and folder names that repeat the parent folder suffix |
| `svg-icon-naming-convention` | SVG components must end with `Icon` suffix |

### Function Rules
| Rule | Description |
|------|-------------|
| `function-arguments-format` 🔧 ⚙️ | ≥2 args: first on new line, each on own line |
| `function-call-spacing` 🔧 | No space before `(`: `fn()` not `fn ()` |
| `function-declaration-style` 🔧 | Convert function declarations to arrow expressions |
| `function-naming-convention` 🔧 | camelCase + verb, handlers end with `Handler` |
| `function-params-per-line` 🔧 | Multiline params: each on own line |

### Hook Rules
| Rule | Description |
|------|-------------|
| `hook-callback-format` 🔧 | Callback on new line, deps on separate line |
| `hook-deps-per-line` 🔧 ⚙️ | ≤2 deps inline; >2 each on own line |
| `use-state-naming-convention` 🔧 ⚙️ | Boolean state: `is`/`has`/`with`/`without` prefix |

### Import/Export Rules
| Rule | Description |
|------|-------------|
| `absolute-imports-only` 🔧 ⚙️ | Use `@/` alias from index files; relative imports within same module folder to avoid circular deps |
| `import-format` 🔧 ⚙️ | ≤3 specifiers inline; >3 each on own line |
| `export-format` 🔧 ⚙️ | ≤3 specifiers inline; >3 each on own line |
| `index-exports-only` | Index files: re-exports only, no code definitions |
| `inline-export-declaration` 🔧 ⚙️ | Use `export const x = ...` not grouped `export { x }` in non-index files |

### JSX Rules
| Rule | Description |
|------|-------------|
| `jsx-children-on-new-line` 🔧 | Multiple children: each on own line |
| `jsx-simple-element-one-line` 🔧 | Simple JSX with single child on one line |
| `jsx-ternary-format` 🔧 | Simple ternaries inline; complex get parentheses |
| `classname-multiline` 🔧 ⚙️ | Long className strings break to multiple lines |
| `classname-order` 🔧 | Tailwind class ordering |
| `no-empty-lines-in-jsx` 🔧 | No empty lines between children |

### Object Rules
| Rule | Description |
|------|-------------|
| `object-property-per-line` 🔧 ⚙️ | Multiline: each property on own line |
| `no-empty-lines-in-objects` 🔧 | No empty lines between properties |
| `opening-brackets-same-line` 🔧 | `{`, `[`, `(` on same line as call |

### TypeScript Rules
| Rule | Description |
|------|-------------|
| `interface-format` 🔧 | PascalCase + `Interface` suffix, camelCase properties |
| `type-format` 🔧 ⚙️ | PascalCase + `Type` suffix, camelCase properties |
| `enum-format` 🔧 | PascalCase + `Enum` suffix, UPPER_SNAKE_CASE members |
| `type-annotation-spacing` 🔧 | No space before `:`, space after |
| `prop-naming-convention` 🔧 ⚙️ | Boolean: `is`/`has` prefix; Callbacks: `on` prefix |

### Code Organization
| Rule | Description |
|------|-------------|
| `react-code-order` 🔧 | refs → state → effects → callbacks → handlers → render |
| `no-hardcoded-strings` ⚙️ | Import strings from `@/constants` |
| `variable-naming-convention` 🔧 | camelCase for variables, proper prefixes for booleans |

---

## Other ESLint Plugins

| Plugin | Purpose |
|--------|---------|
| `@stylistic/eslint-plugin` | 4-space indent, double quotes, semicolons, trailing commas |
| `eslint-plugin-perfectionist` | Sorted objects, interfaces, imports |
| `eslint-plugin-check-file` | kebab-case files and folders |
| `eslint-plugin-tailwindcss` | Tailwind CSS rules |

---

## Theme Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-primary` | `#1356BC` | Primary actions |
| `--color-primary-dark` | `#0025BA` | Hover states |
| `--color-background` | `#F6F6F6` | Page background |
| `--color-surface` | `#FFFFFF` | Card backgrounds |
| `--color-error` | `#DC2626` | Error states |
| `--radius-default` | `14px` | Border radius |

---

## Build & Development

```bash
pnpm install      # Install dependencies
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm lint         # Check linting
pnpm lint:fix     # Auto-fix lint issues
```

---

## Git Workflow

### Commit Format

```
<type>(<scope>): <subject>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `chore`, `deps`

### Versioning (SemVer)

| Bump | When |
|------|------|
| **PATCH** | Bug fixes, minor tweaks |
| **MINOR** | New features, components |
| **MAJOR** | Breaking changes, removed features |

**Version Sync:** `package.json` version must match `CHANGELOG.md`

---

## Documentation Sync

| Change | Update |
|--------|--------|
| New folder | AGENTS.md, CLAUDE.md |
| Version bump | package.json, CHANGELOG.md |
| New convention | AGENTS.md, CLAUDE.md |
| eslint-plugin-code-style update | AGENTS.md (Rules Summary), CLAUDE.md (Must-Know Rules) |

---

## Important Notes

1. **Run `pnpm lint:fix` before every commit**
2. **Read eslint-plugin-code-style full docs before coding**
3. **Use absolute imports only (`@/...`)**
4. **Keep AGENTS.md and CLAUDE.md in sync with project structure**
