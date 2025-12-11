# Twindix Admin Panel Monorepo

## Quick Start

**First step:**

Run the following command in the root of the monorepo to install all dependencies and set up Husky git hooks:

```sh
pnpm install
```

This will ensure commit message conventions are enforced automatically.

## About Twindix
Twindix empowers leaders through psychological insight and management science to unlock personal and team potential.

### Mission & Vision: Transforming Leadership
At Twindix, our mission is to empower leaders by providing them with the tools and insights needed to unlock their full potential. We believe leadership is more than just managing people—it's about understanding the intricate behaviors and dynamics that drive success within an organization. Our vision is to foster growth and create transformative leadership by delivering actionable insights that allow businesses to move beyond the surface and into deeper, more strategic decision-making.

At the core of Twindix is the belief that clarity leads to growth. Through our innovative assessments, we help leaders gain the clarity they need to make informed decisions, improve team dynamics, and unlock hidden potential. Our commitment is to help organizations not only identify their strengths but also fill the gaps and overcome obstacles, enabling them to thrive in today's competitive landscape.

#### Key Components of Our Vision
- **Empowering Leaders Through Insight:**
  - We provide leaders with a deeper understanding of their own management style and their team’s dynamics. This knowledge empowers leaders to make better decisions, improve communication, and strengthen team cohesion.
- **Catalyzing Growth Through Insight:**
  - Our assessments are designed to catalyze growth by highlighting areas for improvement and providing clear, actionable steps to address them. We aim to transform how leaders manage, turning insights into long-lasting change.
- **Real Solutions for Leaders:**
  - Twindix is about practical applications. Our assessments provide real-world solutions that leaders can implement immediately, helping them create environments that support both personal and organizational growth.

---

## Monorepo Structure
This repository contains the complete codebase for the Twindix Admin Panel, organized as a monorepo with two main components:

- **backend/**: Contains the backend code, APIs, and server-side logic for the admin panel.
- **frontend/**: Contains the frontend code, user interface, and client-side logic for the admin panel.

Each folder includes its own README with specific setup and usage instructions. Use this global README as an entry point to understand the overall purpose and structure of the Twindix Admin Panel monorepo.

---


For more details on setting up or contributing to each part, please refer to the respective README files in the `backend` and `frontend` directories.

---

## Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for all commit messages. This helps automate releases, improve readability, and maintain a clear project history.

### Jira Ticket Integration

All commit messages and branch names should include the relevant Jira ticket ID for traceability. The format is:

#### Commit Message Format

```
<type>: (TWN-ADM-[Ticket-ID]) <COMMIT MESSAGE>
```

**Example:**

```
fix: (TWN-ADM-123) correct login validation bug
```

> **Tip:** Keep commit messages concise and descriptive, ideally not exceeding 70 characters.

#### Branch Name Format

```
<type>/TWN-ADM-[Ticket-ID]/branch-description
```

**Example:**

```
feat/TWN-ADM-123/User-Profile
```

### Commit Types

- **feat:** A new feature (e.g., `feat: Add User Login Page`)
- **fix:** A bug fix (e.g., `fix: Correct Typo in Dashboard`)
- **chore:** Changes to the build process or auxiliary tools and libraries (e.g., `chore: Update Dependencies`)
- **docs:** Documentation only changes (e.g., `docs: Update API Docs`)
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.) (e.g., `style: Format Code`)
- **refactor:** A code change that neither fixes a bug nor adds a feature (e.g., `refactor: Simplify User Service Logic`)
- **perf:** A code change that improves performance (e.g., `perf: Optimize Query Speed`)
- **test:** Adding missing tests or correcting existing tests (e.g., `test: Add Unit Tests for Auth`)
- **deps:** Dependency updates (e.g., `deps: Bump React Version`)

Refer to the [Conventional Commits documentation](https://www.conventionalcommits.org/en/v1.0.0/) for more details and examples.

---

## Branch Flow Convention

We follow a structured branch flow to ensure stability and smooth delivery:

- **main**: The production branch. Only thoroughly tested and approved code is merged here. Deployments to production are made from this branch.
- **dev**: The main development branch. All feature and fix branches are merged here first for integration and testing. Deployments to the testing environment are made from this branch.
- **bug/hotfix/**: Dedicated to urgent bug fixes that affect the production environment. This branch is created from the latest `main` and is used to quickly patch critical issues (e.g., crashes, blocking flows). After the fix, a PR is opened directly to `main` and deployed to production immediately, ensuring minimal disruption for users.

### Feature and Other Branch Naming Conventions

- **Feature branches:** `feat/TWN-ADM-[Ticket-ID]/feature-name`
- **Chore branches:** `chore/TWN-ADM-[Ticket-ID]/branch-name`
- **Fix branches:** `fix/TWN-ADM-[Ticket-ID]/bug-description`

#### Example Branch Flow

1. For new features or regular fixes:
  - Create a branch from `dev` (e.g., `feat/User-Profile`)
  - Open a PR to `dev`
  - After testing, open a PR from `dev` to `main` for production deployment

2. For urgent production bugs:
  - Create a branch from `main` (e.g., `bug/hotfix/login-crash`)
  - Open a PR directly to `main`
  - Deploy to production after merge

This ensures that urgent issues are resolved quickly, while regular development follows a stable and testable flow.
