# 💖 Romantic Birthday Surprise Website

A cinematic, interactive birthday experience built with React, Three.js, and Tailwind CSS.
Features a hidden heart collection system, daily virtual gifts, mini-games, a vintage love letter, a countdown, and a secret unlockable surprise – all wrapped in a romantic space-themed 3D scene.

![sample_images](/public/images/home.png)
![sample_images](/public/images/countdown.png)
![sample_images](/public/images/dailygift.png)
![sample_images](/public/images/letter.png)
![sample_images](/public/images/secret.png)

## ✨ Features

* 🎬 **Cinematic intro** with typing animation and gift box
* ❤️ **Hidden heart collection** (5 hearts unlock a secret page)
* 🎁 **Daily gift box** – different virtual gift each day (chocolate, teddy, flowers, cake on birthday)
* 🎮 **Two mini-games** – Catch the Hearts & Romantic Space Shooter
* 💌 **Vintage-style love letter** with parchment effect and wax seal
* ⏰ **Countdown timer** to the birthday, with confetti celebration
* 🎵 **Background music** with play/pause & mute controls (autoplay attempt on load)
* 🌌 **3D space scene** with floating hearts, stars, and sparkles
* 📱 **Fully responsive** and mobile-friendly
* 🔒 **Secret page** unlocked after collecting all hearts
* 🚀 **Deployable to GitHub Pages** (static hosting)

## 🛠️ Tech Stack

* **Frontend**: React 18 + Vite
* **3D Graphics**: React Three Fiber, Three.js, Drei
* **Animations**: Framer Motion, CSS keyframes
* **Styling**: Tailwind CSS
* **State Management**: Zustand + localStorage persistence
* **Routing**: React Router DOM
* **Hosting**: GitHub Pages

## 📦 Installation

```bash
git clone https://github.com/Praveenkanth2805/romantic-birthday.git
cd romantic-birthday
npm install
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
VITE_HER_NAME="Your Beloved's Name"
VITE_BIRTHDAY=yyyy-mm-dd
VITE_NICKNAME="Sweetheart"
```

Note: Values are baked at build time. Change them and rebuild to update the site.

## 🚀 Running Locally

```bash
npm run dev
```

Open http://localhost:3000

## 🎯 Building for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

## 🌐 Deploying to GitHub Pages

Update `vite.config.js`:

```js
base: '/romantic-birthday/',
```

Add deploy scripts in `package.json`.

Run:

```bash
npm run deploy
```

Enable GitHub Pages (branch: gh-pages).

Live URL:
https://Praveenkanth2805.github.io/romantic-birthday/

## 📁 Project Structure

```
romantic-birthday/
├── public/
│   ├── music/
│   │   └── bg.mp3
│   └── .nojekyll
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
```

## 🎮 How to Play / Collect Hearts

* Open gift box → heart #1
* Home page button → heart #2
* Love Letter → heart #3
* Countdown → heart #4
* Games → heart #5

After 5 → Secret page unlocks 🎉

## 🎁 Daily Gift Logic

* Birthday → Cake 🎂
* 1 day → Chocolate 🍫
* 2 days → Teddy 🧸
* 3 days → Flowers 🌸
* 4 days → Letter 💌
* 5 days → Surprise 🎁
* 6 days → Star 🌟
* 7+ → Ring 💍

## 🧪 Troubleshooting

* Music not autoplay → user interaction needed
* White screen → check `base`
* 404 → router issue

## 📄 License

Personal use only.

## 💌 Acknowledgements

* Three.js
* Tailwind CSS
* Framer Motion

Made with 💖 for someone special.
