import { useEffect, useState } from 'react';

type CountdownProps = {
  expiresAt: string;
  onExpire?: () => void;
};

export function CountdownTimer({ expiresAt, onExpire }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0); // Store time left in milliseconds

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expirationTime = new Date(expiresAt).getTime();
      return Math.max(expirationTime - now, 0); // Ensure non-negative time
    };

    const updateTimer = () => {
      const remainingTime = calculateTimeLeft();
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        onExpire?.();
        clearInterval(timer);
      }
    };

    // Initial calculation
    updateTimer();

    const timer = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, [expiresAt, onExpire]);

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="text-center">
      <div className="text-sm text-gray-600 mb-1">Holding price ... </div>
      <div
        className={`font-mono text-lg font-bold ${
          timeLeft === 0 ? 'text-red-600' : 'text-blue-600'
        }`}
      >
        {timeLeft === 0 ? 'Expired' : formatTime(timeLeft)}
      </div>
    </div>
  );
}