// src/components/common/ProgressBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLoveStore } from '../../store/useLoveStore';

const ProgressBar = () => {
  const { hearts } = useLoveStore();
  const totalHearts = 5;
  const percentage = (hearts / totalHearts) * 100;

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="flex justify-between text-sm text-pink-700 mb-1">
        <span>💕 Journey to Secret</span>
        <span>{hearts}/{totalHearts} Hearts</span>
      </div>
      <div className="h-3 bg-pink-200 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, type: 'spring' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;