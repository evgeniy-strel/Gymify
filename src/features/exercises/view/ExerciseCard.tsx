import { useCallback, useEffect, useMemo, useState } from "react";

import type { IExercise } from "../api/ExercisesService";
import type { ITimerData } from "../../../utils";
import { CircleTimer } from "../../../components";

import clsx from "clsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DoneIcon from "@mui/icons-material/Done";
import { Skeleton } from "@mui/material";

interface IProps {
  item: IExercise;
  index: number;
  timerData?: ITimerData;
}

const getSetFormWord = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (
    (10 <= lastTwoDigits && lastTwoDigits <= 20) ||
    (5 <= lastDigit && lastDigit <= 9) ||
    lastDigit === 0
  ) {
    return "подходов";
  }

  if (2 <= lastDigit && lastDigit <= 4) {
    return "подхода";
  }

  return "подход";
};

export const ExerciseCard = (props: IProps) => {
  const { item, index, timerData } = props;

  const progress = useMemo(
    () =>
      item.sets.length === 0
        ? 0
        : item.sets.filter((set) => set.is_completed).length / item.sets.length,
    [item],
  );

  const calcIsTimerActive = () =>
    Boolean(timerData && item.sets.find((set) => set.id === timerData.event));

  const [isTimerActive, setIsTimerActive] = useState(calcIsTimerActive);

  const finishTimer = useCallback(() => setIsTimerActive(false), []);

  useEffect(() => {
    setIsTimerActive(calcIsTimerActive);
  }, [timerData, timerData?.active, item]);

  return (
    <div
      className={clsx(
        "select-none rounded-xl p-5 cursor-pointer hover:shadow-xl relative overflow-hidden flex-shrink-0 duration-200 ease-out",
        {
          "bg-gradient-to-r from-blue-500 to-blue-600": item.is_completed,
          "bg-white/85": !item.is_completed,
        },
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            "w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0",
            {
              "bg-white text-black": item.is_completed,
              "bg-blue-600 text-white": !item.is_completed,
            },
          )}
        >
          <div className="text-xl">{item.order || index}</div>
        </div>
        <div>
          <div
            className={clsx("mb-1", {
              "text-white": item.is_completed,
            })}
          >
            {item.title}
          </div>
          <div
            className={clsx("rounded-full flex items-center gap-2 text-sm", {
              "text-gray-300": item.is_completed,
              "text-gray-500": !item.is_completed,
            })}
          >
            {item.description}
          </div>
        </div>
        {item.is_completed ? (
          <DoneIcon className="ml-auto" sx={{ color: "white" }} />
        ) : isTimerActive && timerData ? (
          <CircleTimer
            className="ml-auto"
            data={timerData}
            onFinish={finishTimer}
          />
        ) : (
          <ArrowForwardIosIcon
            className="ml-auto"
            fontSize="small"
            color="action"
          />
        )}
      </div>
      {!item.is_completed && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-br from-blue-500 to-blue-600 bg-gradient-to-br"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <Skeleton variant="rounded" animation="wave" height={92} />
    </div>
  );
};

ExerciseCard.Skeleton = SkeletonCard;

export default ExerciseCard;
