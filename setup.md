# Setup Guide – Romantic Birthday Website

## 1. Prerequisites

* Node.js (v18+)
* npm or yarn
* Git
* GitHub account

## 2. Clone

```bash
git clone https://github.com/Praveenkanth2805/romantic-birthday.git
cd romantic-birthday
```

## 3. Install

```bash
npm install
```

## 4. Environment Variables

Create `.env`:

```
VITE_HER_NAME="Your Beloved's Name"
VITE_BIRTHDAY=2026-04-11
VITE_NICKNAME="Sweetheart"
```

Restart server after changes.

## 5. Add Music

```bash
mkdir -p public/music
cp your-song.mp3 public/music/bg.mp3
```

## 6. Run

```bash
npm run dev
```

## 7. Customize

* Love Letter → `src/pages/LoveLetter.jsx`
* Secret → `src/pages/Secret.jsx`
* Gifts → `DailyGift.jsx`
* Theme → Tailwind config

## 8. Build

```bash
npm run build
```

Preview:

```bash
npm run preview
```

## 9. Deploy

### vite.config.js

```js
base: '/romantic-birthday/',
```

### package.json

```json
{
  "homepage": "https://Praveenkanth2805.github.io/romantic-birthday",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Deploy

```bash
npm run deploy
```

Enable GitHub Pages → gh-pages branch.

## 10. Fix Issues

* 404 → wrong base
* Assets not loading → base mismatch
* Blank page → console check

## 11. Final Checks

* Intro works
* Hearts collect
* Secret unlocks
* Countdown correct
* Games playable
* Music works

## 12. Share

```
https://Praveenkanth2805.github.io/romantic-birthday/
```

Enjoy 💖
