import {
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
  Fragment,
  useCallback,
  memo,
} from "react";

import { formatTime } from "../../utils";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { CircularProgress } from "@mui/material";

import clsx from "clsx";

interface IProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  icon?: React.ElementType;
  iconProps?: object;
  iconPosition?: "beforeText" | "afterText";
  caption?: string;
  readOnly?: boolean;
  withStopWatch?: boolean;
  stopWatchSeconds?: number;
  isLoading?: boolean;
  color?: "primary" | "light";
}

const emptyFunction = () => {};

/* Основная синяя кнопка
 * Опциально может выводить секундомер ожидания выполнения действия
 */
const PrimaryButton = ({
  onClick,
  caption = "",
  icon: Icon = Fragment,
  iconProps = {},
  iconPosition = "afterText",
  readOnly,
  withStopWatch,
  stopWatchSeconds,
  isLoading,
  color = "primary",
}: IProps) => {
  const [seconds, setSeconds] = useState<number>(stopWatchSeconds || 0);

  useEffect(() => {
    if (withStopWatch) {
      let intervalId;
      setSeconds(stopWatchSeconds || 0);
      intervalId = setInterval(() => {
        setSeconds((value) => value + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [stopWatchSeconds]);

  const formattedTime = useMemo(() => formatTime(seconds), [seconds]);

  const displayIcon = useMemo(() => {
    if (isLoading) {
      return (
        <CircularProgress
          size={24}
          sx={{ color: color === "primary" ? "white" : "primary" }}
        />
      );
    }

    return <Icon {...iconProps} />;
  }, [Icon, iconProps, isLoading, color]);

  return (
    <div
      className={clsx(
        "rounded-lg w-full p-3.5 flex items-center justify-center text-lg px-4",
        {
          "bg-blue-400 text-blue-100": color === "primary" && readOnly,
          "bg-blue-600 text-white": color === "primary" && !readOnly,
          "bg-white text-blue-600": color === "light",
        },
      )}
      onClick={readOnly ? emptyFunction : onClick}
    >
      <div className="flex justify-between items-center gap-2">
        {iconPosition === "beforeText" && Icon ? displayIcon : <></>}
        <div>{caption}</div>
        {iconPosition === "afterText" && Icon ? displayIcon : <></>}
      </div>
      {withStopWatch && (
        <div className="flex items-center gap-1.5 ml-auto">
          <AccessTimeIcon /> <div>{formattedTime}</div>
        </div>
      )}
    </div>
  );
};

export default PrimaryButton;
