# Twindix Admin Frontend

This is the frontend application for the Twindix Admin Panel, built with React, Vite, TypeScript, Tailwind CSS, and Radix UI.

## Prerequisites
- Node.js v24.12.0 (see `.nvmrc`)
- pnpm v10.10.0

## Getting Started

1. **Install dependencies:**
	```sh
	pnpm install
	```

2. **Copy environment variables:**
	```sh
	cp .env.example .env
	# Edit .env as needed
	```

3. **Run the development server:**
	```sh
	pnpm dev
	```

4. **Lint the code:**
	```sh
	pnpm lint
	```
	This will lint your codebase.

5. **Auto-fix lint errors (recommended before building):**
	```sh
	pnpm lint:fix
	```
	This will automatically fix many common linting issues in your codebase.

6. **Build for production:**
	```sh
	pnpm build
	```

## Environment Variables
- All environment variables must be prefixed with `VITE_` to be exposed to the frontend.
- See `.env.example` for required variables.

## Project Structure

```
frontend/
├── public/                    # Static assets (favicon, PWA offline page, Netlify redirects)
├── scripts/                   # Build scripts (post-build processing)
├── src/
│   ├── api/                   # API client setup and base configuration
│   ├── assets/                # Static assets and SVG icon components
│   ├── atoms/                 # Themed UI components wrapping ui/ with project identity (colors, radius, fonts)
│   ├── components/            # Multi-element shared components with logic
│   │   └── shared/            # Global UI (Sidebar, PageHeader)
│   ├── constants/             # UI strings that render on screen, organized by type:
│   │   ├── buttons.ts         # Button labels (Sign In, Close, Back to login, ...)
│   │   ├── descriptions.ts    # Paragraphs, content, page descriptions
│   │   ├── labels.ts          # Small labels, captions, placeholders, navigation names
│   │   ├── msgs.ts            # Alert messages, validation errors, success/error messages
│   │   └── titles.ts          # Page titles and headings
│   ├── contexts/              # React context definitions (createContext only)
│   ├── data/                  # Config and structured data that does NOT render directly:
│   │   ├── apis.ts            # API base URL and endpoint paths
│   │   ├── auth.ts            # Auth layout page config (assembles constants into route map)
│   │   ├── common.ts          # App config (cookie, token, query params)
│   │   ├── sidebar.ts         # Sidebar navigation items
│   │   └── routes.ts          # URL route paths
│   ├── enums/                 # TypeScript enums (variants, sizes, element types)
│   ├── hooks/                 # Custom React hooks (useAuth)
│   ├── interfaces/            # TypeScript interfaces
│   ├── layouts/               # Page layout shells with Outlet (AuthLayout, DashboardLayout)
│   ├── providers/             # React context providers with state logic (AuthProvider)
│   ├── routes/                # Router config, route guards (ProtectedRoute, PublicRoute)
│   ├── schemas/               # Yup validation schemas organized by feature
│   ├── services/              # API service functions (auth, business logic)
│   ├── types/                 # TypeScript type aliases
│   ├── ui/                    # Raw Radix/shadcn components (auto-generated, do not edit)
│   ├── utils/                 # Utility functions (axios, cookies, helpers)
│   ├── views/                 # Full page components (*View suffix), one folder per view
│   ├── app.tsx                # Root component (wraps RouterProvider with AuthProvider)
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles, Tailwind theme tokens, custom CSS classes
├── .browserslistrc            # Browser support targets
├── .editorconfig              # Editor configuration
├── .env.example               # Environment variables template
├── .nvmrc                     # Node version specification (24.12.0)
├── AGENTS.md                  # AI agent instructions
├── CHANGELOG.md               # Version history
├── CLAUDE.md                  # Claude-specific configuration
├── LICENSE                    # Proprietary license
├── README.md                  # This file
├── components.json            # shadcn/ui configuration
├── eslint.config.js           # ESLint flat config (79 rules via eslint-plugin-code-style)
├── index.html                 # HTML entry point
├── package.json               # Dependencies & scripts
├── pnpm-lock.yaml             # Lock file
├── postcss.config.mjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.node.json         # TypeScript config for Node
└── vite.config.ts             # Vite configuration with PWA
```

**Component Hierarchy:** `ui/` → `atoms/` → `components/` → `layouts/` → `views/`

**Constants vs Data:**
- `constants/` — UI strings visible to users, organized by **type** (titles, descriptions, labels, buttons, msgs)
- `data/` — Config, structured objects, and non-rendered values (API endpoints, route paths, cookie/token config, navigation items)

For detailed architecture guidelines, see [AGENTS.md](./AGENTS.md).

## Node Version
- The required Node.js version is specified in `.nvmrc` and `package.json` (`24.12.0`).

---

## License

This project is proprietary software. See the [LICENSE](./LICENSE) file for full details.

Copyright (c) 2026 Twindix Global Inc. All rights reserved.

---

For more details, see the root README.
