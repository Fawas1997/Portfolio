# Coding Style Guide

Follow these guidelines when contributing to or modifying the codebase. 

## 1. TypeScript Rules
- **Strict Typing**: Always define types or interfaces for component props, state, and function return values.
- **Avoid `any`**: Do not use the `any` type. Use `unknown` if the type is truly dynamic, or create a specific type/interface.
- **File Extensions**: Use `.tsx` for React components and `.ts` for pure TypeScript logic files (e.g., `translations.ts`).

## 2. React Best Practices
- **Functional Components**: Exclusively use Functional Components with React Hooks. Do not use Class Components.
- **Component Naming**: Use `PascalCase` for component filenames (e.g., `ProjectModal.tsx`) and component function names.
- **Hooks**: Follow standard React hook rules (only call at the top level, etc.).

## 3. Styling (Tailwind CSS)
- **Utility-First**: Use Tailwind CSS utility classes for styling. Avoid inline styles (`style={{...}}`) unless calculating dynamic properties (like transforms based on scroll position).
- **No Custom CSS**: Minimize adding custom CSS to `index.css`. Try to achieve the design using Tailwind's configuration or arbitrary values (e.g., `w-[150px]`) if strictly necessary.

## 4. Internationalization (i18n)
- **Hardcoded Text**: Never hardcode user-facing strings directly in the components.
- **Translations File**: All text must be added to `translations.ts` and accessed via the `LanguageContext` hook.

## 5. Exports and Imports
- **Named Exports**: Prefer named exports over default exports for utility functions and hooks. For React components, default exports are acceptable if it represents the main file export.
- **Path Aliases**: Use the `@/` alias for root-relative imports (configured in `vite.config.ts`), e.g., `import { translations } from '@/translations'`.
