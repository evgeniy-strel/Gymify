import React, { useMemo } from "react";

import {
  formatTimeForDuration,
  IExercise,
  IWorkoutResult,
} from "../../../utils";

import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CountUp from "react-countup";

interface IItemData {
  icon: React.ElementType;
  title: string;
  value: number;
  formatter?: (n: number) => string;
}

interface IItemTemplateProps {
  item: IItemData;
}

const ItemTemplate = ({ item }: IItemTemplateProps) => {
  const { icon: Icon, title, value, formatter } = item;

  return (
    <div className="text-card-foreground rounded-xl py-5 px-2 shadow-lg bg-white w-full flex flex-col items-center text-center">
      <div className="bg-blue-100 p-3 rounded-xl mb-2 inline-flex">
        <Icon sx={{ fontSize: 30 }} color="primary" />
      </div>
      <div className="text-xs text-gray-600 mb-1">{title}</div>
      <div className="text-2xl text-blue-600">
        <CountUp
          start={0}
          end={value}
          duration={1.2}
          formattingFn={formatter}
        />
      </div>
    </div>
  );
};

const getItems = (data: IWorkoutResult): IItemData[] => {
  return [
    {
      icon: HourglassBottomOutlinedIcon,
      title: "Время",
      value: Math.floor(
        (new Date(data.day.completed_at) - new Date(data.day.started_at)) /
          1000,
      ),
      formatter: formatTimeForDuration,
    },
    {
      icon: FitnessCenterOutlinedIcon,
      title: "Упражнения",
      value: data.exercises.length,
    },
    {
      icon: CheckOutlinedIcon,
      title: "Подходы",
      value: data.exercises.reduce(
        (result: number, exercise: IExercise) => result + exercise.sets.length,
        0,
      ),
    },
  ];
};

const StatsInfo = ({ data }: { data: IWorkoutResult }) => {
  const items = useMemo<IItemData[]>(() => getItems(data), [data]);

  return (
    <div className="w-full text-card-foreground flex gap-2.5 rounded-xl border-0 shadow-lg">
      {items.map((item, index) => (
        <ItemTemplate key={index} item={item} />
      ))}
    </div>
  );
};

export default StatsInfo;
