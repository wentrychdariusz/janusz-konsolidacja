
import { useState, useEffect } from 'react';

interface UseCountdownProps {
  initialTime: number; // w sekundach
  onComplete?: () => void;
  storageKey?: string; // klucz do sessionStorage
}

export const useCountdown = ({ initialTime, onComplete, storageKey = 'countdown_timer' }: UseCountdownProps) => {
  // Inicjalizacja czasu z sessionStorage lub wartości początkowej
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!storageKey) return initialTime;
    
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      const { startTime, duration } = JSON.parse(stored);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = duration - elapsed;
      return remaining > 0 ? remaining : 0;
    }
    
    // Zapisz nowy timer w sessionStorage
    sessionStorage.setItem(storageKey, JSON.stringify({
      startTime: Date.now(),
      duration: initialTime
    }));
    return initialTime;
  });

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft <= 0 && onComplete) {
        onComplete();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          setIsActive(false);
          if (storageKey) {
            sessionStorage.removeItem(storageKey);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete, storageKey]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setTimeLeft(initialTime);
    setIsActive(true);
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isActive,
    reset,
    isExpired: timeLeft === 0
  };
};
