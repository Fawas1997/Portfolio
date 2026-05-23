# System Architecture

This document describes the high-level architecture of the Portfolio project.

## 1. Frontend Architecture
The application is a modern Single Page Application (SPA) built using **React 19** and **Vite**. 

- **Component-Based UI**: The interface is broken down into semantic sections (`Hero.tsx`, `About.tsx`, `Projects.tsx`, `Contact.tsx`) stored in the `/components` directory.
- **State Management**:
  - Local state is managed via React Hooks (`useState`, `useEffect`).
  - Global state (specifically for language preference) is managed via the React Context API (`LanguageContext.tsx`).
- **Internationalization (i18n)**: Content is abstracted into `translations.ts`, allowing the UI to dynamically switch between languages based on the `LanguageContext`.
- **Styling Strategy**: 
  - The project exclusively uses **Tailwind CSS v4** for styling via utility classes.
  - Global resets and base layer directives are located in `index.css`.
- **Animations**: 
  - UI micro-interactions and scroll reveals use the `motion` package.
  - Complex vector animations are handled by `@lottiefiles/dotlottie-react`.

## 2. AI Chatbot Integration
The portfolio includes an AI Chatbot (`AIChatbot.tsx`).
- **Environment**: API keys (`GEMINI_API_KEY`) are injected via Vite's `define` configuration.
- **Backend/Serverless**: There is a Python script (`lambda_web_chat.py`), which likely serves as an AWS Lambda function or backend endpoint to process chat requests securely, rather than calling the API directly from the frontend to protect API keys.

## 3. Build & Deployment Pipeline
- **Bundler**: Vite provides an extremely fast dev server and produces highly optimized production builds using Rollup under the hood.
- **Hosting**: Configured for Vercel deployment (indicated by `vercel.json`), taking advantage of Edge caching and serverless functions if needed.
