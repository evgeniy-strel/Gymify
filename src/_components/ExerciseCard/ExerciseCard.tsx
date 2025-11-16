import React from "react";

import clsx from "clsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router";
import type { IExercise } from "../../utils";

interface IProps {
  item: IExercise;
  index: number;
}

export const ExerciseCard = (props: IProps) => {
  const { item, index } = props;

  const navigate = useNavigate();

  const openApproaches = () => {
    navigate(item.id);
  };

  return (
    <div
      className="text-card-foreground rounded-xl p-5 cursor-pointer hover:shadow-xl bg-white/85"
      onClick={openApproaches}
    >
      <div className="flex items-center gap-4">
        <div className="w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg text-white flex-shrink-0 bg-blue-600">
          <div className="text-xl">{index}</div>
        </div>
        <div>
          <div className="mb-1">{item.title}</div>
          <div className="rounded-full flex items-center gap-2 text-sm text-gray-500">
            {item.sets_count
              ? `${item.sets_count} подхода`
              : "подходы не заполнены"}
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
