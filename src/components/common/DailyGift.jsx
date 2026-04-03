import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DailyGift = () => {
  const [gift, setGift] = useState(null);
  const [showGift, setShowGift] = useState(false);
  const [autoShowDone, setAutoShowDone] = useState(false);

  const birthdayStr = import.meta.env.VITE_BIRTHDAY || '2026-04-11';
  const birthdayDate = new Date(birthdayStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const timeDiff = birthdayDate - today;
  const daysBefore = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const gifts = {
    0: { name: '🎂 Birthday Cake', emoji: '🎂', message: 'Happy Birthday! Enjoy this virtual cake! 🍰' },
    1: { name: '🍫 Chocolate', emoji: '🍫', message: 'A sweet chocolate for you! 🍬' },
    2: { name: '🧸 Teddy Bear', emoji: '🧸', message: 'A cuddly teddy bear to hug! 🐻' },
    3: { name: '💐 Flowers', emoji: '💐', message: 'Beautiful roses for a beautiful soul! 🌹' },
    4: { name: '💌 Love Letter', emoji: '💌', message: 'A heartfelt love letter just for you! ✨' },
    5: { name: '🎁 Surprise Box', emoji: '🎁', message: 'A mystery gift – open to see! 🎀' },
    6: { name: '🌟 Star Promise', emoji: '🌟', message: 'I promise to love you forever! 💫' },
    7: { name: '💎 Diamond Ring', emoji: '💍', message: 'A sparkly ring – will you marry me? (just virtual!) 😄' },
  };

  useEffect(() => {
    let dayOffset = daysBefore;
    if (dayOffset < 0) dayOffset = 0;
    if (dayOffset > 7) dayOffset = 7;
    setGift(gifts[dayOffset] || gifts[1]);
  }, [daysBefore]);

  // Auto-show popup 3 seconds after component mounts (every reload)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGift(true);
      setAutoShowDone(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenGift = () => setShowGift(true);
  const closeGift = () => setShowGift(false);

  if (!gift) return null;

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleOpenGift}
        className="absolute bottom-4 left-4 z-20 cursor-pointer bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-xl flex items-center gap-2"
      >
        <span className="text-3xl">🎁</span>
        <span className="text-white font-medium text-sm">Daily Gift</span>
      </motion.div>

      <AnimatePresence>
        {showGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeGift}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-7xl mb-4">{gift.emoji}</div>
              <h3 className="text-2xl font-bold text-pink-700 mb-2">{gift.name}</h3>
              <p className="text-gray-700 mb-4">{gift.message}</p>
              <button
                onClick={closeGift}
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DailyGift;