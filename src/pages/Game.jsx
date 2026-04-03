// src/pages/Game.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeartCollector from '../components/common/HeartCollector';
import CatchTheHearts from '../components/games/CatchTheHearts';
import RomanticSpaceShooter from '../components/games/RomanticSpaceShooter';
import { useLoveStore } from '../store/useLoveStore';

const Game = () => {
  const [activeGame, setActiveGame] = useState('catch');
  const { collectHeart, collectedHearts } = useLoveStore();
  
  const handleCollectHeart = () => {
    if (!collectedHearts.includes('game-heart')) {
      collectHeart('game-heart');
    }
  };
  
  return (
    <div className="min-h-screen p-4 pb-24">
      <HeartCollector />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mt-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-cursive text-pink-600 mb-2">
            Romantic Mini Games 🎮
          </h1>
          <p className="text-pink-500">Play with love and collect hearts!</p>
        </div>
        
        {/* Game Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveGame('catch')}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeGame === 'catch'
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg'
                : 'glass-effect text-pink-200 hover:text-white'
            }`}
          >
            🎯 Catch Hearts
          </button>
          <button
            onClick={() => setActiveGame('shooter')}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeGame === 'shooter'
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg'
                : 'glass-effect text-pink-200 hover:text-white'
            }`}
          >
            🚀 Space Shooter
          </button>
        </div>
        
        {/* Game Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-effect rounded-2xl p-4 md:p-6"
          >
            {activeGame === 'catch' ? <CatchTheHearts /> : <RomanticSpaceShooter />}
          </motion.div>
        </AnimatePresence>
        
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

export default Game;