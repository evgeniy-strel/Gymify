import React from "react";

import clsx from "clsx";

import { IExerciseData } from "./interface";

interface IProps {
  data: IExerciseData;
  index: number;
  gradient: string;
}

export const ExerciseCard = (props: IProps) => {
  const { data, index, gradient = "from-blue-500 to-cyan-500" } = props;

  return (
    <div className="text-card-foreground rounded-xl p-5 cursor-pointer hover:shadow-xl bg-white/85">
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
      </div>
    </div>
  );
};

export default ExerciseCard;
