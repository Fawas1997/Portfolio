# Tech Stack

This file defines the technology stack used in this portfolio project. When suggesting code changes or additions, please ensure compatibility with these specific versions and libraries.

## Core Framework
- **React**: `^19.2.0` - Used for building the user interface.
- **TypeScript**: `~5.8.2` - Used for static typing.
- **Vite**: `^6.2.0` - Build tool and development server.
- **Node.js Environment**: Types defined via `@types/node ^22.14.0`.

## Styling
- **Tailwind CSS**: `^4.2.2` - Utility-first CSS framework (configured via `@tailwindcss/vite`).

## Animation & Graphics
- **Motion (Framer Motion)**: `^12.34.3` - Used for complex component animations and transitions.
- **Lottie**: `@lottiefiles/dotlottie-react` - Used for rendering lightweight JSON-based animations.

## Icons
- **Lucide React**: `^0.575.0` - SVG icon library.
- **React Icons**: `^5.5.0` - Additional icon sets.

## Backend / API Integrations
- **Gemini API**: Configured in Vite for use in an AI chatbot feature.
- **Python**: A Python script (`lambda_web_chat.py`) is present, suggesting a serverless backend or AWS Lambda function integration.

## Routing
- Single Page Application (SPA) structure, currently not utilizing a dedicated router (like React Router), relying on component rendering.

## Deployment
- Contains `vercel.json`, indicating the project is configured for deployment on Vercel.
