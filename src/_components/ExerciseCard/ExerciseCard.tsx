import React from "react";

import clsx from "clsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router";
import type { IExercise } from "../../utils";
import DoneIcon from "@mui/icons-material/Done";
import { Skeleton } from "@mui/material";

interface IProps {
  item: IExercise;
  index: number;
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
  const { item, index } = props;

  const navigate = useNavigate();

  const openApproaches = () => {
    navigate(item.id);
  };

  return (
    <div
      className={clsx("rounded-xl p-5 cursor-pointer hover:shadow-xl", {
        "bg-gradient-to-r from-blue-500 to-blue-600": item.is_completed,
        "bg-white/85": !item.is_completed,
      })}
      onClick={openApproaches}
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
            {item.sets_count
              ? `${item.sets_count} ${getSetFormWord(item.sets_count)}`
              : "подходы не заполнены"}
          </div>
        </div>
        {item.is_completed ? (
          <DoneIcon className="ml-auto" sx={{ color: "white" }} />
        ) : (
          <ArrowForwardIosIcon
            className="ml-auto"
            fontSize="small"
            color="action"
          />
        )}
      </div>
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
