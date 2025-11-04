import React from "react";

import clsx from "clsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { IExerciseData } from "./interface";
import { useNavigate } from "react-router";

interface IProps {
  data: IExerciseData;
  index: number;
  gradient: string;
}

export const ExerciseCard = (props: IProps) => {
  const { data, index, gradient = "from-blue-500 to-cyan-500" } = props;

  const navigate = useNavigate();

  const openApproaches = () => {
    navigate(data.title);
  };

  return (
    <div
      className="text-card-foreground rounded-xl p-5 cursor-pointer hover:shadow-xl bg-white/85"
      onClick={openApproaches}
    >
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            "w-13 h-13 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white flex-shrink-0",
            gradient
          )}
        >
          <div className="text-xl">{index}</div>
        </div>
        <div>
          <div className="mb-1">{data.title}</div>
          <div className="rounded-full flex items-center gap-2 text-sm text-gray-500">
            {data.approaches} подхода
          </div>
        </div>
        <ArrowForwardIosIcon
          className="ml-auto"
          fontSize="small"
          color="action"
        />
      </div>
    </div>
  );
};

export default ExerciseCard;
