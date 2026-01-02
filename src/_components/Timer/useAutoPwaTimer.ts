import { useEffect, useRef, useState } from "react";
import { notifyTimerFinished } from "../../utils";

const STORAGE_KEY = "auto_timer_end";

export function useAutoPwaTimer(durationSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const endTimeRef = useRef<number | null>(null);
  const notifiedRef = useRef(false);

  // восстановление или автозапуск
  useEffect(() => {
    const savedEnd = localStorage.getItem(STORAGE_KEY);

    if (savedEnd) {
      endTimeRef.current = Number(savedEnd);
    } else {
      const end = Date.now() + durationSeconds * 1000;
      endTimeRef.current = end;
      localStorage.setItem(STORAGE_KEY, String(end));
    }

    const tick = async () => {
      if (!endTimeRef.current) return;

      const diff = Math.max(
        0,
        Math.floor((endTimeRef.current - Date.now()) / 1000)
      );

      setSecondsLeft(diff);

      if (diff === 0 && !notifiedRef.current) {
        notifiedRef.current = true;
        localStorage.removeItem(STORAGE_KEY);
        // await notifyTimerFinished();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [durationSeconds]);

  function reset() {
    const end = Date.now() + durationSeconds * 1000;
    endTimeRef.current = end;
    notifiedRef.current = false;

    localStorage.setItem(STORAGE_KEY, String(end));
    setSecondsLeft(durationSeconds);
  }

  return {
    secondsLeft,
    reset,
    isFinished: secondsLeft === 0,
  };
}
