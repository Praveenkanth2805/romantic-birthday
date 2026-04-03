// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeartCollector from '../components/common/HeartCollector';
import ProgressBar from '../components/common/ProgressBar';
import SpaceScene from '../components/three/SpaceScene';
import { useLoveStore } from '../store/useLoveStore';

const Home = () => {
  const navigate = useNavigate();
  const { hearts, collectHeart, collectedHearts, secretUnlocked } = useLoveStore();
  const [showSecretAlert, setShowSecretAlert] = useState(false);
  //const herName = import.meta.env.VITE_HER_NAME || 'My Love';
  const Name = import.meta.env.VITE_NAME || 'My Love';
  const nickname = import.meta.env.VITE_NICKNAME || 'Sweet heart';

  // Show alert when secret gets unlocked
  useEffect(() => {
    if (hearts >= 5 && !showSecretAlert) {
      setShowSecretAlert(true);
      // Auto-hide after 5 seconds
      setTimeout(() => setShowSecretAlert(false), 5000);
    }
  }, [hearts, showSecretAlert]);
  
  const handleCollectHeart = () => {
    if (!collectedHearts.includes('home-heart')) {
      collectHeart('home-heart');
      // Show floating heart animation
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
    if (secretUnlocked) {
      navigate('/secret');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <HeartCollector />
      
      {/* Secret Unlocked Alert */}
      <AnimatePresence>
        {showSecretAlert && secretUnlocked && (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
    className="fixed top-20 right-1 transform -translate-x-1/2 z-50 glass-effect rounded-2xl p-4 shadow-2xl cursor-pointer"
    onClick={() => {
      setShowSecretAlert(false);  // hide immediately
      goToSecret();               // then navigate
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
      </AnimatePresence>
      
      {/* Hero Section */}
      <div className="relative pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-cursive text-pink-800 mb-2">
            Happy Birthday,{Name}! 🎂
          </h1>
          <p className="text-xl md:text-2xl text-pink-700 mb-4">
             Every day with you is a celebration of love 💖
          </p>
          <ProgressBar />
        </motion.div>
        
        {/* Space Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <SpaceScene />
        </motion.div>
        
        {/* Hidden Heart */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCollectHeart}
          className="fixed bottom-24 left-4 z-40 w-12 h-12 bg-white/40 rounded-full backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/60 transition-all shadow-lg"
        >
          <span className="text-2xl">💖</span>
        </motion.button>
        
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
            <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-3">💌</div>
              <h3 className="text-xl font-bold text-pink-800">Love Letter</h3>
              <p className="text-pink-700 text-sm mt-2">Words from the heart</p>
            </div>
          </Link>
          
          <Link to="/countdown">
            <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-3">⏰</div>
              <h3 className="text-xl font-bold text-pink-800">Countdown</h3>
              <p className="text-pink-700 text-sm mt-2">To our special day</p>
            </div>
          </Link>
          
          <Link to="/game">
            <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
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