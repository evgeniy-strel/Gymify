import { useMemo } from "react";

import { useTimer } from "../hooks/useTimer";
import { ITimerData } from "../api/Timers";
import { getDuration } from "../utils/helpers";
import { formatTime } from "../../utils";

import clsx from "clsx";

interface ITimerProps {
  data: ITimerData;
  className?: string;
}

/**
 * Компонент таймера в виде прогрессбара
 */
const Timer = ({ className, data }: ITimerProps) => {
  const duration = useMemo<number>(
    () => getDuration(data.started, data.end),
    [data.end, data.started],
  );

  const { secondsLeft, isFinished } = useTimer(data.secondsLeft);

  const formattedTime = useMemo(() => formatTime(secondsLeft), [secondsLeft]);

  const percent = ((duration - secondsLeft) / duration) * 100;

  if (isFinished) {
    return <></>;
  }

  return (
    <div
      className={clsx(
        className,
        `bg-blue-100 rounded-full overflow-hidden relative`,
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
