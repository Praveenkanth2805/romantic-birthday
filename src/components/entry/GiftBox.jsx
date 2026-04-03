// src/components/entry/GiftBox.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GiftBox = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        onOpen();
      }, 1000);
    }, 500);
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1, rotate: 360 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="cursor-pointer"
      onClick={handleOpen}
    >
      <div className="relative w-48 h-48 mx-auto">
        {/* Gift Box Body */}
        <motion.div
          animate={isOpening ? { y: -100, opacity: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 w-full h-32 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-300 rounded-full -mt-4" />
          <div className="absolute top-1/2 left-0 w-full h-4 bg-red-600 transform -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-4 h-full bg-red-600 transform -translate-x-1/2" />
        </motion.div>
        
        {/* Gift Lid */}
        <motion.div
          animate={isOpening ? { y: -80, rotateX: 90, opacity: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="absolute top-0 w-48 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-t-lg shadow-lg"
        />
        
        {/* Sparkle Effect */}
        <AnimatePresence>
          {isOpening && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-6xl">✨</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm whitespace-nowrap"
          >
            Click to Open 🎁
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GiftBox;