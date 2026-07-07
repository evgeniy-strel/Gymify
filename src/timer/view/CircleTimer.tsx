import { useEffect, useMemo } from "react";

import { useTimer } from "../hooks/useTimer";
import { getDuration } from "../utils/helpers";
import { formatTime } from "../../utils";
import { ITimerData } from "../api/Timers";

import clsx from "clsx";
import { Box, CircularProgress, Typography } from "@mui/material";

interface ITimerProps {
  data: ITimerData;
  className?: string;
  onFinish?: Function;
}

/**
 * Компонент таймера в виде прогрессбара
 */
const CircleTimer = ({ className, data, onFinish }: ITimerProps) => {
  const duration = useMemo<number>(
    () => getDuration(data.started, data.end),
    [data.end, data.started],
  );

  const { secondsLeft, isFinished } = useTimer(data.secondsLeft);

  const formattedTime = useMemo(() => formatTime(secondsLeft), [secondsLeft]);

  const value = (secondsLeft / duration) * 100;

  useEffect(() => {
    if (isFinished) {
      onFinish?.();
    }
  }, [isFinished]);

  if (isFinished) {
    return <></>;
  }

  return (
    <div className={clsx(className, "flex items-center justify-center")}>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          enableTrackSlot
          variant="determinate"
          value={value}
          sx={{ color: "#155dfc" }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {formattedTime}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CircleTimer;
