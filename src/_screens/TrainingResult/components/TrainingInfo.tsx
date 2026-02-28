import { useMemo } from "react";

import { IWorkoutResult } from "../../../utils";

import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import ChangeHistoryOutlinedIcon from "@mui/icons-material/ChangeHistoryOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

interface IItemData {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface IItemTemplateProps {
  item: IItemData;
}

const ItemTemplate = ({ item }: IItemTemplateProps) => {
  const { icon: Icon, title, description } = item;

  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="bg-blue-100 p-3 rounded-xl mb-2 inline-flex">
        <Icon sx={{ fontSize: 26 }} color="primary" />
      </div>
      <div className="text-xs text-gray-600 mb-1">{title}</div>
      <div className="text-blue-900 text-sm">{description}</div>
    </div>
  );
};

export const getItems = (data: IWorkoutResult): IItemData[] => {
  const program = data.program;
  return [
    {
      icon: SquareOutlinedIcon,
      title: "Программа",
      description: program.title,
    },
    {
      icon: ChangeHistoryOutlinedIcon,
      title: "Неделя",
      description: `${data.day.week_id.split("_").at(-1)}/${program.totalWeek}`,
    },
    {
      icon: CircleOutlinedIcon,
      title: "День",
      description: `${data.day.number}/${data.days.length}`,
    },
  ];
};

export const TrainingInfo = ({ data }: { data: IWorkoutResult }) => {
  const items = useMemo<IItemData[]>(() => getItems(data), [data]);

  return (
    <div className="bg-white w-full text-card-foreground flex gap-5 rounded-xl p-5 border-0 shadow-lg">
      {items.map((item, index) => (
        <ItemTemplate key={index} item={item} />
      ))}
    </div>
  );
};
