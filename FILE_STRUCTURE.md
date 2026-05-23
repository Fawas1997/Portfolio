# File Structure

This document outlines the high-level file and directory structure of the project to help understand where different parts of the application reside.

```text
/Portfolio
│
├── components/          # Reusable UI components
│   ├── About.tsx        # About me section
│   ├── AIChatbot.tsx    # AI chatbot component (integrates with Gemini API)
│   ├── Banner.tsx       # UI banner
│   ├── Contact.tsx      # Contact form/info section
│   ├── Experience.tsx   # Experience section
│   ├── Footer.tsx       # Page footer
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero/landing section
│   ├── ProjectModal.tsx # Modal for detailed project view
│   ├── Projects.tsx     # Project showcase section
│   ├── ScrollToTopButton.tsx # Utility UI button
│   └── WorkExperience.tsx    # Work experience sub-component
│
├── public/              # Static assets (images, raw Lottie JSONs, etc.)
│
├── App.tsx              # Main application root component
├── index.tsx            # Entry point for React rendering
├── index.html           # Main HTML template
├── index.css            # Global CSS and Tailwind directives
│
├── LanguageContext.tsx  # React Context for handling i18n (Internationalization)
├── translations.ts      # Dictionary/data file for multi-language support
│
├── lambda_web_chat.py   # Python backend/serverless function for the chatbot
│
├── vite.config.ts       # Vite bundler configuration
├── tsconfig.json        # TypeScript compiler configuration
├── package.json         # Node.js dependencies and scripts
└── vercel.json          # Deployment configuration for Vercel
```

## Key Architectural Locations
- **UI Components**: All visual pieces are separated into the `/components` folder.
- **Global State**: Managed via Context (`LanguageContext.tsx`).
- **Translations**: Text content is isolated in `translations.ts` to support multiple languages easily.
