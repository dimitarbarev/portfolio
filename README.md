# Dimitar Barev Portfolio

Interactive personal portfolio showcasing software engineering projects, AI research, endurance sports achievements, and professional experience.

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Formspree
* Vercel

## Features

* Interactive project case studies
* OCR research showcase
* Enterprise software engineering projects
* Athletics and endurance achievements
* Responsive design
* Contact form integration
* Smooth animations and modern UI

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Contact Form

The contact form is powered by Formspree and does not require a custom backend.

### Configuration

Create a Formspree form and update the endpoint in:

```text
src/data/siteConfig.ts
```

Example:

```ts
export const FORMSPREE_ENDPOINT =
  "https://formspree.io/f/your-form-id";
```

Personal links (LinkedIn, GitHub, Medium, Strava, CV path) live in the same file. Contact delivery is handled by Formspree only — no email address is embedded in the frontend.

### Features

* Name, email, and message validation
* Spam protection via honeypot field
* Direct email notifications
* No database required

## Build

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment

This project is optimized for Vercel deployment.

1. Push the repository to GitHub
2. Import the repository into Vercel
3. Deploy using:

```text
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

No environment variables are required for the contact form.

### Social previews (LinkedIn, X, WhatsApp, Discord)

Set your production URL so Open Graph tags resolve to absolute image and page URLs:

```bash
# .env.production or Vercel → Environment Variables
VITE_SITE_URL=https://your-portfolio.vercel.app
```

SEO title, description, and OG image are configured in `src/data/siteConfig.ts`. The share image is `public/og-image.jpg` (hero scene).

## Live Portfolio

Add your deployed Vercel URL here.

## Author

**Dimitar Barev**

Software Engineer • AI Researcher • Endurance Athlete

Public links are configured in `src/data/siteConfig.ts`.
