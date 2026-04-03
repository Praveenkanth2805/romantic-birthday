import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Create single audio instance
    const audio = new Audio('/romantic-birthday/music/bg.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Attempt autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          hasStartedRef.current = true;
        })
        .catch(() => {
          setIsPlaying(false);
          // Wait for first user interaction
          const startAudio = () => {
            if (audioRef.current && !hasStartedRef.current) {
              audioRef.current.play()
                .then(() => {
                  setIsPlaying(true);
                  hasStartedRef.current = true;
                })
                .catch(e => console.log(e));
              window.removeEventListener('click', startAudio);
              window.removeEventListener('touchstart', startAudio);
            }
          };
          window.addEventListener('click', startAudio);
          window.addEventListener('touchstart', startAudio);
        });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log(e));
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