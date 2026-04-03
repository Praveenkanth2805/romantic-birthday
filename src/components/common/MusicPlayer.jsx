import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Default to true (playing)
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create single audio instance
    const audio = new Audio('/romantic-birthday/music/bg.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Attempt to autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
        // Autoplay blocked – will start on first user interaction
      });
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Mute effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Play error:', err));
    }
  };

  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md shadow-lg flex items-center justify-center"
      >
        <span className="text-2xl">{isPlaying ? '⏸️' : '▶️'}</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md shadow-lg flex items-center justify-center"
      >
        <span className="text-2xl">{isMuted ? '🔇' : '🔊'}</span>
      </motion.button>
    </div>
  );
};

export default MusicPlayer;