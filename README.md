# CI-CD-Calculator-Front

## 1. Introduction

Frontend for the calculator application: a React single-page app that lets users enter two numbers and perform sum, subtract, multiply, and divide. It calls the backend REST API and is built with Vite and deployed on GitHub Pages.

**Repository:** [https://github.com/haleluque/CI-CD-Calculator-Front](https://github.com/haleluque/CI-CD-Calculator-Front)

---

## 2. Technology stack

- **React 19** + **Vite 7**
- **ESLint** (lint), **Vitest** + **Testing Library** (tests)
- **GitHub Actions** (CI/CD)
- **GitHub Pages** – hosts the static site
- **Render** – hosts the backend API used by this frontend

**Live frontend:** `https://<username>.github.io/CI-CD-Calculator-Front/`  
**Backend API (Render):** [https://ci-cd-calculator-latest.onrender.com](https://ci-cd-calculator-latest.onrender.com)

---

## 3. CI/CD process

The workflow runs on every **push** and **pull request** to `main` or `master`:

1. **Build** – Checkout, prepare Node/npm (via reusable action), run `npm run build`, upload the `dist/` artifact.
2. **Lint** – Depends on build; runs `npm run lint` (ESLint).
3. **Test** – Depends on build; runs `npm run test` (Vitest).
4. **Security** – Depends on build; runs Trivy (filesystem scan), fails on CRITICAL/HIGH vulnerabilities.
5. **Deploy (GitHub Pages)** – Runs only on **push** to `main`/`master`, after build, lint, test, and security pass. Builds again with `VITE_BASE_PATH` and `VITE_API_URL` set for Pages, uploads the artifact, and deploys via the `deploy-pages` action.

GitHub Pages is configured with **Source: GitHub Actions** in the repo settings; no separate Jekyll or static workflow is required.
