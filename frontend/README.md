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
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── offline.html           # PWA offline fallback
│   └── _redirects             # Netlify redirects
├── src/
│   ├── api/                   # API client functions
│   ├── atoms/                 # Custom UI components (wraps ui/, applies project identity)
│   ├── components/            # Shared components with logic
│   │   └── shared/            # Global UI (Navbar, Sidebar, Footer)
│   ├── constants/             # App constants and configuration
│   ├── contexts/              # React context providers
│   ├── data/                  # Static data
│   ├── enums/                 # TypeScript enums
│   ├── hooks/                 # Custom React hooks
│   ├── interfaces/            # TypeScript interfaces
│   ├── layouts/               # View layouts (DashboardLayout, AuthLayout)
│   ├── services/              # Business logic & API services
│   ├── types/                 # TypeScript type aliases
│   ├── ui/                    # Radix/shadcn raw components (auto-generated)
│   ├── utils/                 # Utility functions
│   ├── views/                 # Full page UI (*View suffix)
│   ├── app.tsx                # Root application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles & Tailwind theme
├── scripts/                   # Build scripts
│   └── postbuild.mjs          # Post-build processing
├── .browserslistrc            # Browser support targets
├── .editorconfig              # Editor configuration
├── .env.example               # Environment variables template
├── .nvmrc                     # Node version specification
├── AGENTS.md                  # AI agent instructions
├── CHANGELOG.md               # Version history
├── CLAUDE.md                  # Claude-specific configuration
├── LICENSE                    # Proprietary license
├── README.md                  # This file
├── components.json            # shadcn/ui configuration
├── eslint.config.js           # ESLint flat config
├── index.html                 # HTML entry point
├── package.json               # Dependencies & scripts
├── pnpm-lock.yaml             # Lock file
├── postcss.config.mjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.node.json         # TypeScript config for Node
└── vite.config.ts             # Vite configuration with PWA
```

**Component Flow:** `ui/` → `atoms/` → `components/` → `layouts/` → `views/`

For detailed architecture guidelines, see [AGENTS.md](./AGENTS.md).

## Node Version
- The required Node.js version is specified in `.nvmrc` and `package.json` (`24.12.0`).

---

## License

This project is proprietary software. See the [LICENSE](./LICENSE) file for full details.

Copyright (c) 2026 Twindix Global Inc. All rights reserved.

---

For more details, see the root README.
