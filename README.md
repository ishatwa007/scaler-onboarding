# Scaler DSML Onboarding Prototype

Full onboarding flow: Questionnaire (6 steps) → Personalised Welcome → Gamified Dashboard

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Deploy to Vercel (free, 30 seconds)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Scaler DSML onboarding prototype"
```

Go to github.com → New repository → Create it, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/scaler-onboarding.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Select the `scaler-onboarding` repo
4. Framework: Vite (auto-detected)
5. Click "Deploy"

Done. You'll get a live URL like `scaler-onboarding-xyz.vercel.app` in about 30 seconds.

### Alternative: Deploy on Netlify

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click "Add new site" → "Import an existing project"
3. Select the repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy

## Features

- 6-step questionnaire with social proof, voice-to-form option, and gap visualisation
- Personalised welcome with alumni matching and AI concern mapping
- Gamified dashboard with coin system, readiness score, tier progress
- AI buddy chat with pre-written responses and WhatsApp escalation
- MnG countdown timer
- Proactive nudges (5 seconds after landing on dashboard)
- Calendar sent popup
- WhatsApp-first counsellor card
- Adaptive pre-read based on skill level
- Confetti on completing all milestones
- 28-day quest tracker
- 12-month roadmap
