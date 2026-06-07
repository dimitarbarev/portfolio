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
src/data/contact.ts
```

Example:

```ts
export const FORMSPREE_ENDPOINT =
  "https://formspree.io/f/mqeopyne";
```

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

## Live Portfolio

Add your deployed Vercel URL here.

## Author

**Dimitar Barev**

Software Engineer • AI Researcher • Endurance Athlete

* LinkedIn: https://linkedin.com/in/dimitarbarev
* GitHub: https://github.com/dimitarbarev
* Medium: https://medium.com/@mitkobarev
