import { useEffect, useState } from "react";

interface IUseCountDownProps {
  initialTime: number;
  onFinish: () => void;
}

export const useCountdown = ({ initialTime, onFinish }: IUseCountDownProps) => {
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);

  useEffect(() => {
    let countDownInterval: NodeJS.Timeout | undefined;
    if (countdownRunning && currentTime > 0) {
      countDownInterval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (countdownRunning && currentTime === 0) {
      setCountdownRunning(false);
      onFinish();
    }
    return () => {
      if (countDownInterval) {
        clearInterval(countDownInterval);
      }
    };
  }, [countdownRunning, currentTime, onFinish]);
  return { countdownRunning, currentTime, setCurrentTime, setCountdownRunning };
};
