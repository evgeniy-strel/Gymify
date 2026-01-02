import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useTimer } from "react-timer-hook";

interface ITimerProps {
  seconds?: number;
  className?: string;
  onFinish?: Function;
}

const formatTime = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  let sec = String(seconds % 60);
  if (sec.length === 1) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

const SECONDS = 20;
const date = new Date(new Date().getTime() + SECONDS * 1000);

const Timer = ({ className }: ITimerProps) => {
  const seconds = 20;
  const [currentSecond, setCurrentSecond] = useState<number>(0);
  const formattedTime = useMemo(
    () => formatTime(seconds - currentSecond),
    [seconds, currentSecond]
  );

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      setCurrentSecond((value) => {
        if (value > seconds) {
          clearInterval(intervalId);
        }
        return value + 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const percent = (currentSecond / seconds) * 100;

  if (currentSecond >= seconds) {
    return <></>;
  }

  return (
    <div
      className={clsx(
        className,
        `bg-blue-100 rounded-full overflow-hidden relative`
      )}
    >
      <div
        style={{ width: `${percent}%` }}
        className="bg-blue-500 absolute left-0 top-0 h-full"
      ></div>
      <div className="text-center relative z-10">{formattedTime}</div>
    </div>
  );
};

export default Timer;
