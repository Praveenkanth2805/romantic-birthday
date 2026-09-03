# 💖 Romantic Birthday Surprise Website

> A cinematic, interactive birthday experience created with **React, Three.js, and Tailwind CSS** — designed to turn a birthday into a memorable digital surprise. 💕✨

![Home Preview](/public/images/home.png)
![Countdown Preview](/public/images/countdown.png)
![Daily Gift Preview](/public/images/dailygift.png)
![Love Letter Preview](/public/images/letter.png)
![Secret Preview](/public/images/secret.png)

---

## ✨ Features

* 🎬 **Cinematic Introduction**

  * Typing animation
  * Interactive gift box
  * Romantic opening experience

* ❤️ **Hidden Heart Collection**

  * Discover 5 hidden hearts throughout the website
  * Collecting all hearts unlocks the secret page

* 🎁 **Daily Virtual Gifts**

  * Gift changes based on the number of days remaining
  * Includes chocolate, teddy, flowers, cake, letter, surprise, star, and ring

* 🎮 **Mini Games**

  * Catch the Hearts
  * Romantic Space Shooter

* 💌 **Vintage Love Letter**

  * Parchment-style design
  * Wax seal effect
  * Romantic interactive experience

* ⏰ **Birthday Countdown**

  * Live countdown timer
  * Birthday celebration with confetti

* 🎵 **Background Music**

  * Play / pause controls
  * Mute support
  * Autoplay attempt after page load

* 🌌 **3D Romantic Space**

  * Floating hearts
  * Stars
  * Sparkles
  * Interactive 3D environment

* 📱 **Responsive Design**

  * Mobile-friendly
  * Tablet-friendly
  * Desktop experience

* 🔒 **Secret Surprise**

  * Locked until all 5 hearts are collected
  * Final surprise page

* 🚀 **GitHub Pages Ready**

  * Fully static frontend
  * Can be deployed using GitHub Pages

---

## 🛠️ Tech Stack

| Technology        | Purpose                        |
| ----------------- | ------------------------------ |
| React 18          | Frontend UI                    |
| Vite              | Development & build tool       |
| React Three Fiber | 3D React integration           |
| Three.js          | 3D graphics                    |
| Drei              | Three.js helpers               |
| Framer Motion     | UI animations                  |
| Tailwind CSS      | Styling                        |
| Zustand           | State management               |
| localStorage      | Persistent heart/gift progress |
| React Router DOM  | Client-side routing            |
| GitHub Pages      | Hosting                        |

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Praveenkanth2805/romantic-birthday.git
```

Navigate to the project:

```bash
cd romantic-birthday
```

Install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_HER_NAME="Your Beloved's Name"
VITE_BIRTHDAY="yyyy-mm-dd"
VITE_NICKNAME="Sweetheart"
```

### Example

```env
VITE_HER_NAME="Your Beloved's Name"
VITE_BIRTHDAY="2026-12-25"
VITE_NICKNAME="Sweetheart"
```

> **Note:** Vite environment variables are embedded during the build process. After changing `.env`, restart the development server or rebuild the project.

---

## 🚀 Running Locally

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🎯 Production Build

Create a production build:

```bash
npm run build
```

The generated files will be available inside:

```text
dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

### 1. Configure Vite

Update `vite.config.js`:

```js
export default defineConfig({
  base: '/romantic-birthday/',
});
```

> The `base` value should match your GitHub repository name.

### 2. Add deployment scripts

Configure your `package.json` with the required GitHub Pages deployment scripts.

### 3. Deploy

```bash
npm run deploy
```

### 4. Enable GitHub Pages

In your GitHub repository:

```text
Settings
   → Pages
   → Deploy from branch
   → gh-pages
```

### 🌍 Live Website

https://Praveenkanth2805.github.io/romantic-birthday/

---

## 📁 Project Structure

```text
romantic-birthday/
│
├── public/
│   ├── images/
│   │   ├── home.png
│   │   ├── countdown.png
│   │   ├── dailygift.png
│   │   ├── letter.png
│   │   └── secret.png
│   │
│   ├── music/
│   │   └── bg.mp3
│   │
│   └── .nojekyll
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ❤️ Heart Collection

The website contains **5 hidden hearts**.

| Heart | Location          |
| ----- | ----------------- |
| ❤️ #1 | Open the gift box |
| ❤️ #2 | Home page button  |
| ❤️ #3 | Love Letter       |
| ❤️ #4 | Countdown         |
| ❤️ #5 | Games             |

Once all five hearts are collected:

```text
❤️ + ❤️ + ❤️ + ❤️ + ❤️
            ↓
     🔓 Secret Unlocked
```

🎉 The final secret page becomes accessible.

---

## 🎁 Daily Gift Logic

The virtual gift changes depending on how many days remain before the birthday.

| Days Remaining | Gift      |
| -------------: | --------- |
|    🎂 Birthday | Cake      |
|       🍫 1 day | Chocolate |
|      🧸 2 days | Teddy     |
|      🌸 3 days | Flowers   |
|      💌 4 days | Letter    |
|      🎁 5 days | Surprise  |
|      🌟 6 days | Star      |
|     💍 7+ days | Ring      |

---

## 🎮 Mini Games

### ❤️ Catch the Hearts

Catch as many hearts as possible and enjoy a small interactive romantic game.

### 🚀 Romantic Space Shooter

A space-themed mini-game featuring:

* 🌌 Space environment
* ❤️ Romantic elements
* 🚀 Shooter gameplay
* ✨ Animated effects

---

## 🎵 Background Music

The website supports background music with:

* ▶️ Play
* ⏸️ Pause
* 🔇 Mute
* 🔊 Unmute

> Modern browsers may block audio autoplay until the user interacts with the page.

---

## 🔒 Privacy & Data

This project is designed as a **static frontend experience**.

User progress such as collected hearts can be stored locally using:

```text
localStorage
```

No backend database is required for the core experience.

---

## 🧪 Troubleshooting

### 🎵 Music doesn't autoplay

Browsers commonly block autoplay audio.

Interact with the website first and then start the music manually.

### ⚪ White screen after deployment

Check the Vite `base` configuration:

```js
base: '/romantic-birthday/',
```

Make sure it matches your GitHub repository name.

### 🔴 404 after refreshing a page

This can happen with client-side routing on static hosting.

Check your React Router configuration and GitHub Pages deployment setup.

### 📦 Dependency errors

Try reinstalling dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 Concept

This project combines:

```text
Romance ❤️
   +
Interactive Storytelling 🎬
   +
3D Experience 🌌
   +
Mini Games 🎮
   +
Personalized Gifts 🎁
   +
Secret Surprise 🔒
```

The goal is to make a birthday wish feel less like a normal webpage and more like a **small interactive digital experience**. 💖

---

## 📄 License

**Personal use only.**

Copyright © 2026 **Praveenkanth G**. All rights reserved.

This project may not be redistributed, commercially reused, or republished without permission from the author.

---

## 💌 Acknowledgements

Built with ❤️ using:

* React
* Vite
* Three.js
* React Three Fiber
* Drei
* Framer Motion
* Tailwind CSS
* Zustand

---

## 👨‍💻 Author

**Praveenkanth G**

Made with 💖 for someone special.

---

⭐ If you like the concept, feel free to star the repository.
