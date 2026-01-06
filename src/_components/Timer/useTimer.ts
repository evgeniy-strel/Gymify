import { useEffect, useState } from "react";
import { TimersService } from "../../utils";

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
        if (value === 0) {
          TimersService.check();
          clearInterval(interval);
          return value;
        }

        return value - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    secondsLeft,
    isFinished: secondsLeft <= 0,
  };
}
