import { MouseEventHandler, useEffect, useMemo, useState } from "react";

import { formatTime } from "../../utils";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import clsx from "clsx";

interface IProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  icon?: React.ElementType;
  iconPosition?: "beforeText" | "afterText";
  caption?: string;
  readOnly?: boolean;
  withStopWatch?: boolean;
  stopWatchSeconds?: number;
}

const emptyFunction = () => {};

/* Основная синяя кнопка
 * Опциально может выводить секундомер ожидания выполнения действия
 */
const PrimaryButton = ({
  onClick,
  caption = "",
  icon: Icon,
  iconPosition = "afterText",
  readOnly,
  withStopWatch,
  stopWatchSeconds,
}: IProps) => {
  const [seconds, setSeconds] = useState<number>(stopWatchSeconds || 0);

  useEffect(() => {
    if (withStopWatch) {
      let intervalId;
      intervalId = setInterval(() => {
        setSeconds((value) => value + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  const formattedTime = useMemo(() => formatTime(seconds), [seconds]);

  return (
    <div
      className={clsx(
        "rounded-md w-full h-14 flex items-center justify-center text-m px-4",
        {
          "bg-blue-400 text-blue-100": readOnly,
          "bg-blue-600 text-white": !readOnly,
        }
      )}
      onClick={readOnly ? emptyFunction : onClick}
    >
      <div className="flex justify-between gap-2">
        {iconPosition === "beforeText" && Icon ? <Icon /> : <></>}
        <div>{caption}</div>
        {iconPosition === "afterText" && Icon ? <Icon /> : <></>}
      </div>
      {withStopWatch && (
        <div className="flex gap-1.5 ml-auto">
          <AccessTimeIcon /> <div>{formattedTime}</div>
        </div>
      )}
    </div>
  );
};

export default PrimaryButton;
