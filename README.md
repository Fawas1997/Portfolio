# 🚀 Portfolio — Fawas Thongkham

Personal portfolio website built with React + TypeScript + Tailwind CSS to showcase all my projects, experiences, and skills in one place.

## ✨ Key Features

- 🌗 **Dark / Light Mode** — Toggle themes manually or set automatically based on time (Day/Night).
- 🌐 **Bilingual Support** — Instantly switch between Thai and English.
- 📱 **Responsive Design** — Fully optimized for mobile, tablet, and desktop screens.
- 🎞️ **Slide Gallery** — View detailed project information complete with slides and workflows.
- ⚡ **Smooth Scroll** — Fluid and seamless page scrolling animations.
- 📄 **Resume Download** — Direct download link for my Resume.
- 🛡️ **Security Headers** — Server-level security measures to prevent attacks.

## 🛡️ Security Headers (Vercel)

For maximum security, this website implements Security Headers via the `vercel.json` file:

- **X-Frame-Options (DENY)**: Prevents Clickjacking attacks.
- **X-Content-Type-Options (nosniff)**: Prevents MIME Sniffing.
- **Referrer-Policy**: Controls privacy regarding traffic source information.
- **Permissions-Policy**: Prevents unauthorized access to device hardware (Camera/Mic/GPS).
- **Strict-Transport-Security (HSTS)**: Enforces strict secure connections via HTTPS.

## 🔍 Search Engine Optimization (SEO)

This website is SEO-optimized to improve visibility and accessibility:

- **Meta Tags**: Properly configured Title, Description, and Keywords for better search results.
- **Open Graph (OG)**: Supports rich previews when sharing links on LINE, Facebook, or other Social Media platforms (includes clear images and descriptions).
- **Semantic HTML**: Correct use of HTML5 tags (h1-h6, section, main) to help Search Engines easily parse the content structure.
- **Performance Optimized**: Uses `.webp` images and efficient loading techniques for fast rendering (Lighthouse Best Practices).

## 🛠️ Tech Stack

| Technology | Description |
|-----------|-----------|
| **React 19** | UI Framework |
| **TypeScript** | Type Safety |
| **Tailwind CSS 4** | Styling |
| **Vite 6** | Build Tool & Dev Server |
| **Motion (Framer Motion)** | Animations |
| **React Icons** | Icon library |
| **Lucide React** | Additional icons |
| **Lottie** | Lottie animations |

## 📁 Project Structure

```text
Portfolio/
├── components/           # All UI Components
│   ├── Header.tsx        # Top navigation + Theme/Language toggle
│   ├── Hero.tsx          # Landing section & introduction
│   ├── About.tsx         # About me + Skills
│   ├── Projects.tsx      # Project showcase
│   ├── ProjectModal.tsx  # Modal for project details
│   ├── Experience.tsx    # Technical experience
│   ├── WorkExperience.tsx # Internship experience
│   ├── Contact.tsx       # Contact information
│   ├── Footer.tsx        # Website footer
│   └── ScrollToTopButton.tsx # Scroll to top utility
├── public/
│   ├── logoicon/         # Logo icons
│   ├── logoprofile/      # Profile picture + PDF Resume
│   └── project-slides/   # Project presentation slides
├── App.tsx               # Main component
├── index.tsx             # Entry Point
├── index.css             # Global Styles + Tailwind directives
├── translations.ts       # Thai/English dictionary
├── LanguageContext.tsx   # Context for language switching
├── vite.config.ts        # Vite configuration
├── vercel.json           # Vercel deployment configuration
└── package.json
```

## 📂 Featured Projects

| Project | Description |
|---------|----------|
| **RecommendationsAI** | AI-powered restaurant/travel recommendation web app using Google Maps reviews and OpenAI. |
| **Social Listening Dashboard** | Social media brand trend analysis dashboard built with Zocial Eye + Tableau. |
| **Bot Creates File Banner** | Chatbot that automatically generates LINE Beacon Banner request documents. |
| **GeoCheck** | Field employee check-in system using GPS + Photos + Telegram integration. |

## 🚀 Local Development

**Prerequisites:** [Node.js](https://nodejs.org/) (v18 or higher)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

The website will be available at `http://localhost:3000`

## 📦 Build

```bash
npm run build
```

The compiled files will be located in the `dist/` folder.

## 🌐 Deploying to Vercel

1. Push code to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Import Project** → select your repository.
3. Vercel will automatically detect Vite.
4. Click **Deploy** ✅

## 📬 Contact

- 📧 Email: fawas1997s@gmail.com
- 📱 Line: fa.shanks
- 🐙 GitHub: [Fawas1997](https://github.com/Fawas1997)

---

Built with ❤ by **Fawas Thongkham**
