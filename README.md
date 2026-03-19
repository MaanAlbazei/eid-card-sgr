# Saudi Gold Refinery - Eid Greeting Card Generator

Modern, bilingual (Arabic/English) Eid greeting card generator for Saudi Gold Refinery employees.

## Local Setup

1. Open the project folder:
   - make sure you are inside the repo root (where `package.json` lives)
2. Install dependencies:
   - `npm install`

## How to Run Locally

```bash
npm run dev
```

Open:
- http://localhost:3000

## How to Replace the Company Logo

1. Replace the placeholder file:
   - `public/assets/logo-placeholder.png`
2. If you change the filename/path, update:
   - `config/brand.config.ts` -> `logoPath`

Recommendation:
- Use a transparent PNG (logo background removed)
- Recommended dimensions: ~800x800px (or higher)

## How to Replace the Eid Background Image

1. Replace the placeholder file:
   - `public/assets/eid-background.jpg`
2. If you change the filename/path, update:
   - `config/brand.config.ts` -> `eidBackgroundPath`

Recommendation:
- Portrait image
- Recommended dimensions: ~1080x1350px (or higher)

## How to Change Company Names

Update:
- `config/brand.config.ts` -> `companyName.ar`
- `config/brand.config.ts` -> `companyName.en`

These values control:
- Navbar company name
- Footer company branding
- Card footer branding

## How to Update Default Eid Messages

Update:
- `config/brand.config.ts` -> `defaultEidGreeting.ar`
- `config/brand.config.ts` -> `defaultEidGreeting.en`

These values are used to:
- prefill the greeting message on first load
- switch the default greeting when you change the language (only if the user hasn’t edited the text)

## How to Deploy to Vercel (Free)

1. Push this project to GitHub.
2. In Vercel, click **New Project** and import your repository.
3. Use:
   - **Build Command**: `npm run build`
4. Click **Deploy**.

This project is frontend-only: no backend, no database, and no authentication.

## How to Customize for Saudi Gold Refinery

The app branding and greetings are controlled from:
- `config/brand.config.ts`

1. Real SGR logo
   - Put your real logo at: `public/assets/logo-placeholder.png`
   - (Or update `logoPath` in `config/brand.config.ts`)

2. Real Eid background
   - Put your real background at: `public/assets/eid-background.jpg`
   - (Or update `eidBackgroundPath` in `config/brand.config.ts`)

3. Company name and text
   - `companyName` and `footerText` in `config/brand.config.ts`

4. Arabic + English greeting defaults
   - `defaultEidGreeting` in `config/brand.config.ts`

After you update the files above, the UI (labels, placeholders, and preview) will automatically reflect the new branding and greeting defaults.

