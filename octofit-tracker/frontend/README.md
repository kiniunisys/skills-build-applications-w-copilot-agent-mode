# OctoFit Tracker frontend

## Development

Define `VITE_CODESPACE_NAME` in `.env.local` when running the frontend in
Codespaces. For example:

```env
VITE_CODESPACE_NAME=super-space-parakeet-jjrvwxgwpp7r2j6rq
```

The frontend calls `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/...`
in Codespaces and safely falls back to `http://localhost:8000/api/...` when the
variable is unset.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
