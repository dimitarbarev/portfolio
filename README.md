# Dimitar Barev — Portfolio

Interactive personal portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Contact form (Formspree)

The contact form uses [Formspree](https://formspree.io) — no custom backend or API keys in the frontend.

### Setup

1. **Create a Formspree account** at [formspree.io](https://formspree.io).
2. **Create a new form** in the Formspree dashboard.
3. Set the notification email to your private inbox (e.g. `mitkobarev@gmail.com`).
4. **Copy the form endpoint** — it looks like:
   ```
   https://formspree.io/f/abcxyz123
   ```
5. The form endpoint is configured in `src/data/contact.ts`:
   ```ts
   export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqeopyne'
   ```
6. **Test locally** — fill out the Contact section and submit. Check Formspree logs and your inbox.
7. **Deploy to Vercel** — push to GitHub and import the repo in [Vercel](https://vercel.com). No environment variables are required for the contact form.

### Form behaviour

- Fields: name, email, message (with client-side validation)
- Hidden honeypot field for basic spam protection
- Submissions are handled by Formspree — nothing is stored in a database by this project

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel: **Add New Project** → import the repo.
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

After deployment, test the contact form on your live URL.
