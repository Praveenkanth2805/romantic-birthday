import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DailyGift = () => {
  const [gift, setGift] = useState(null);
  const [showGift, setShowGift] = useState(false);
  const [hasOpenedToday, setHasOpenedToday] = useState(false);

  const birthdayStr = import.meta.env.VITE_BIRTHDAY || '2026-04-11';
  const birthdayDate = new Date(birthdayStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate days before birthday (difference in days)
  const timeDiff = birthdayDate - today;
  const daysBefore = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // Gift mapping: day offset (0 = birthday) -> gift
  const gifts = {
    0: { name: '🎂 Birthday Cake', emoji: '🎂', message: 'Happy Birthday! Enjoy this virtual cake! 🍰' },
    1: { name: '🍫 Chocolate', emoji: '🍫', message: 'A sweet chocolate for you! 🍬' },
    2: { name: '🧸 Teddy Bear', emoji: '🧸', message: 'A cuddly teddy bear to hug! 🐻' },
    3: { name: '💐 Flowers', emoji: '💐', message: 'Beautiful roses for a beautiful soul! 🌹' },
    4: { name: '💌 Love Letter', emoji: '💌', message: 'A heartfelt love letter just for you! ✨' },
    5: { name: '🎁 Surprise Box', emoji: '🎁', message: 'A mystery gift – open to see! 🎀' },
    6: { name: '🌟 Star Promise', emoji: '🌟', message: 'I promise to love you forever! 💫' },
    7: { name: '💎 Diamond Ring', emoji: '💍', message: 'A sparkly ring – will you marry me? (just virtual for now!) 😄' },
  };

  // Determine which gift to show based on days before birthday
  useEffect(() => {
    let dayOffset = daysBefore;
    if (dayOffset < 0) dayOffset = 0; // after birthday, show cake
    if (dayOffset > 7) dayOffset = 7;  // more than 7 days before, show first gift (chocolate)
    const giftData = gifts[dayOffset] || gifts[1];
    setGift(giftData);
  }, [daysBefore]);

  // Check if user already opened today's gift (store in localStorage with date)
  useEffect(() => {
    const lastOpened = localStorage.getItem('dailyGiftDate');
    const todayStr = today.toDateString();
    if (lastOpened === todayStr) {
      setHasOpenedToday(true);
    } else {
      setHasOpenedToday(false);
    }
  }, [today]);

  const handleOpenGift = () => {
    if (hasOpenedToday) return;
    setShowGift(true);
    setHasOpenedToday(true);
    localStorage.setItem('dailyGiftDate', today.toDateString());
    // Optional: collect a heart when opening gift
    // You can integrate with useLoveStore if you want
  };

  const closeGift = () => setShowGift(false);

  if (!gift) return null;

  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
        onClick={handleOpenGift}
      >
        <div className="relative w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl shadow-2xl flex items-center justify-center hover:scale-105 transition-transform">
          <span className="text-4xl animate-bounce">🎁</span>
          {!hasOpenedToday && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full animate-pulse" />
          )}
        </div>
        <p className="text-center text-white text-sm mt-1 font-medium">Daily Gift</p>
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