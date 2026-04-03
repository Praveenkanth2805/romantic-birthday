// src/App.jsx
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLoveStore } from './store/useLoveStore';
import MusicPlayer from './components/common/MusicPlayer';
import FloatingHearts from './components/three/FloatingHearts';

// Lazy load pages for performance
const EntryPage = lazy(() => import('./pages/EntryPage'));
const Home = lazy(() => import('./pages/Home'));
const LoveLetter = lazy(() => import('./pages/LoveLetter'));
const Countdown = lazy(() => import('./pages/Countdown'));
const Game = lazy(() => import('./pages/Game'));
const Secret = lazy(() => import('./pages/Secret'));

function App() {
  const { secretUnlocked, loadFromStorage } = useLoveStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <BrowserRouter basename="/romantic-birthday">
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Background floating hearts effect */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <FloatingHearts />
        </div>
        
        {/* Music Player - Global */}
        <MusicPlayer />
        
        {/* Main Content */}
        <div className="relative z-10">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-4xl animate-pulse">💖</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<EntryPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/love-letter" element={<LoveLetter />} />
              <Route path="/countdown" element={<Countdown />} />
              <Route path="/game" element={<Game />} />
              <Route path="/secret" element={
                secretUnlocked ? <Secret /> : <Navigate to="/home" replace />
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;