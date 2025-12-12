# Twindix Admin Frontend

This is the frontend application for the Twindix Admin Panel, built with React, Vite, TypeScript, Tailwind CSS, and Radix UI.

## Prerequisites
- Node.js v22.14.0 (see `.nvmrc`)
- pnpm (recommended)

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
- `src/` — Your React app source code
- `tsconfig.json` — TypeScript configuration
- `eslint.config.mjs` — ESLint configuration

## Node Version
- The required Node.js version is specified in `.nvmrc` and `package.json` (`22.14.0`).

---

For more details, see the root README.
