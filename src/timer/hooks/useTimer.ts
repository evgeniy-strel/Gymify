import { useEffect, useState } from "react";

import TimersService from "../api/Timers";

/* Хук таймера, умеет отсчитывать время и высылать уведомление при окончании */
export function useTimer(seconds: number) {
  const [secondsLeft, setSecondsLeft] = useState<number>(seconds);

  useEffect(() => {
    setSecondsLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setSecondsLeft((value) => {
        const newValue = value - 1;

        if (newValue === 0) {
          TimersService.check();
          clearInterval(interval);
          return newValue;
        }

        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    secondsLeft,
    isFinished: secondsLeft <= 0,
  };
}
