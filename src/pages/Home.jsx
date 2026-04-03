// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeartCollector from '../components/common/HeartCollector';
import ProgressBar from '../components/common/ProgressBar';
import SpaceScene from '../components/three/SpaceScene';
import { useLoveStore } from '../store/useLoveStore';
import DailyGift from '../components/common/DailyGift';

const Home = () => {
  const navigate = useNavigate();
  const { hearts, collectHeart, collectedHearts, secretUnlocked } = useLoveStore();
  const [showSecretAlert, setShowSecretAlert] = useState(false);
  const Name = import.meta.env.VITE_HER_NAME || 'My Love';
  const nickname = import.meta.env.VITE_NICKNAME || 'Sweet heart';

  const birthdayDate = new Date(import.meta.env.VITE_BIRTHDAY || '2026-04-11');
  const today = new Date();
  const isBirthday = today.getFullYear() === birthdayDate.getFullYear() &&
                     today.getMonth() === birthdayDate.getMonth() &&
                     today.getDate() === birthdayDate.getDate();
  const greeting = isBirthday ? 'Happy Birthday!' : 'Advance Happy Birthday!';

  useEffect(() => {
    if (hearts >= 5 && !showSecretAlert) {
      setShowSecretAlert(true);
      setTimeout(() => setShowSecretAlert(false), 5000);
    }
  }, [hearts, showSecretAlert]);

  const handleCollectHeart = () => {
    if (!collectedHearts.includes('home-heart')) {
      collectHeart('home-heart');
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.className = 'fixed text-4xl animate-float pointer-events-none z-50';
      heart.style.left = '50%';
      heart.style.top = '50%';
      heart.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
  };

  const goToSecret = () => {
    if (secretUnlocked) navigate('/secret');
  };

  return (
    <div className="min-h-screen pb-20">
      <HeartCollector />

      {/* Secret Unlocked Alert - bottom right near music player
      <AnimatePresence>
        {showSecretAlert && secretUnlocked && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-24 right-6 z-50 glass-effect rounded-2xl p-4 shadow-2xl cursor-pointer"
            onClick={() => {
              setShowSecretAlert(false);
              goToSecret();
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce">🔓✨</span>
              <div>
                <p className="font-bold text-pink-800">Secret Unlocked!</p>
                <p className="text-sm text-pink-700">Click here to reveal your surprise 💖</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>  */}

      {/* Hero Section */}
      <div className="relative pt-16 px-4">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl md:text-6xl font-cursive text-pink-800 mb-2">
            {greeting}, {Name}! 🎂
          </h1>
          <p className="text-xl md:text-2xl text-pink-700 mb-4">
            Every day with you is a celebration of love 💖
          </p>
          <ProgressBar />
        </motion.div>

        {/* Space Scene WITH Daily Gift AND Secret Popup inside */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.3 }}
  className="relative mt-8 max-w-4xl mx-auto"
>
  <SpaceScene />
  <DailyGift />
  
  {/* Secret Unlocked Alert - now inside this container */}
  <AnimatePresence>
    {showSecretAlert && secretUnlocked && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute bottom-4 right-4 z-30 glass-effect rounded-2xl p-3 shadow-2xl cursor-pointer"
        onClick={() => {
          setShowSecretAlert(false);
          goToSecret();
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-bounce">🔓✨</span>
          <div>
            <p className="font-bold text-pink-800 text-sm">Secret Unlocked!</p>
            <p className="text-xs text-pink-700">Click to reveal 💖</p>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>

        {/* Secret Entry Button (only when unlocked) */}
        {secretUnlocked && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={goToSecret}
            className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2"
          >
            <span>✨</span> Unlock Secret <span>💖</span>
          </motion.button>
        )}

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
        >
          <Link to="/love-letter">
            <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-all cursor-pointer">
              <div className="text-5xl mb-3">💌</div>
              <h3 className="text-xl font-bold text-pink-800">Love Letter</h3>
              <p className="text-pink-700 text-sm mt-2">Words from the heart</p>
            </div>
          </Link>
          <Link to="/countdown">
            <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-all cursor-pointer">
              <div className="text-5xl mb-3">⏰</div>
              <h3 className="text-xl font-bold text-pink-800">Countdown</h3>
              <p className="text-pink-700 text-sm mt-2">To our special day</p>
            </div>
          </Link>
          <Link to="/game">
            <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-all cursor-pointer">
              <div className="text-5xl mb-3">🎮</div>
              <h3 className="text-xl font-bold text-pink-800">Mini Games</h3>
              <p className="text-pink-700 text-sm mt-2">Play with love</p>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Hint for remaining hearts */}
      {hearts < 5 && hearts > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 animate-pulse">
          <div className="glass-effect rounded-full px-4 py-2 text-sm text-pink-800 font-medium">
            💕 Find {5 - hearts} more hidden hearts! 💕
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;