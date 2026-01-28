import {
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
  Fragment,
  useCallback,
} from "react";

import { formatTime } from "../../utils";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { CircularProgress } from "@mui/material";

import clsx from "clsx";

interface IProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  icon?: React.ElementType;
  iconPosition?: "beforeText" | "afterText";
  caption?: string;
  readOnly?: boolean;
  withStopWatch?: boolean;
  stopWatchSeconds?: number;
  isLoading?: boolean;
}

const emptyFunction = () => {};

/* Основная синяя кнопка
 * Опциально может выводить секундомер ожидания выполнения действия
 */
const PrimaryButton = ({
  onClick,
  caption = "",
  icon: Icon = Fragment,
  iconPosition = "afterText",
  readOnly,
  withStopWatch,
  stopWatchSeconds,
  isLoading,
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

  const DisplayIcon = useCallback(() => {
    if (isLoading) {
      return <CircularProgress size={24} sx={{ color: "white" }} />;
    }

    return <Icon />;
  }, [Icon, isLoading]);

  return (
    <div
      className={clsx(
        "rounded-lg w-full p-3.5 flex items-center justify-center text-lg px-4",
        {
          "bg-blue-400 text-blue-100": readOnly,
          "bg-blue-600 text-white ": !readOnly,
        },
      )}
      onClick={readOnly ? emptyFunction : onClick}
    >
      <div className="flex justify-between items-center gap-2">
        {iconPosition === "beforeText" && Icon ? <DisplayIcon /> : <></>}
        <div>{caption}</div>
        {iconPosition === "afterText" && Icon ? <DisplayIcon /> : <></>}
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
