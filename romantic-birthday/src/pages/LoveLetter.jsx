// src/pages/LoveLetter.jsx
import React from 'react';
import { motion } from 'framer-motion';
import HeartCollector from '../components/common/HeartCollector';
import { useLoveStore } from '../store/useLoveStore';

const LoveLetter = () => {
  const { collectHeart, collectedHearts } = useLoveStore();
  const herName = import.meta.env.VITE_HER_NAME || 'My Love';

  const handleCollectHeart = () => {
    if (!collectedHearts.includes('love-heart')) {
      collectHeart('love-heart');
    }
  };

  return (
    <div className="min-h-screen p-4 pb-24">
      <HeartCollector />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mt-8"
      >
        <div className="glass-effect rounded-2xl p-8 shadow-2xl relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-4xl animate-float">
            💌
          </div>
          
          <div className="mt-8 space-y-6 text-white font-cursive">
            <p className="text-2xl text-center">Dearest {herName},</p>
            
            <p className="text-lg leading-relaxed">
              On this beautiful day, as the universe celebrates your existence, 
              I want you to know that you are the most precious gift life has ever given me.
            </p>
            
            <p className="text-lg leading-relaxed">
              Your smile lights up my darkest days, your laughter is the sweetest melody, 
              and your love has transformed my world into a garden of endless possibilities.
            </p>
            
            <p className="text-lg leading-relaxed">
              Every moment with you feels like a beautiful dream I never want to wake from. 
              You've taught me what true love means - patient, kind, and unconditional.
            </p>
            
            <p className="text-lg leading-relaxed">
              Today, I celebrate not just your birthday, but the incredible person you are. 
              Your strength inspires me, your kindness humbles me, and your love completes me.
            </p>
            
            <p className="text-xl text-center font-bold">
              Forever yours,<br />
              With all my love 💖
            </p>
          </div>
          
          <div className="mt-8 text-center text-pink-200 text-sm">
            "You are my today and all of my tomorrows"
          </div>
        </div>
        
        {/* Hidden Heart */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCollectHeart}
          className="fixed bottom-24 left-4 z-40 w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/40 transition-all"
        >
          <span className="text-2xl">💖</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoveLetter;