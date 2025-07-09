
import { useState, useEffect } from 'react';

interface UseCountdownProps {
  initialTime: number; // w sekundach
  onComplete?: () => void;
}

export const useCountdown = ({ initialTime, onComplete }: UseCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
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
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

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
