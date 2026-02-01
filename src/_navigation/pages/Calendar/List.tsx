import React, { useMemo } from "react";

import { formatTime, formatTimeForDuration, IDay } from "../../../utils";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

interface IItemTemplateProps {
  item: IDay;
}

function formatDateNoYearSuffix(date: string | Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(new Date(date))
    .replace("г.", "")
    .trim();
}

function formatWeekday(date: string | Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
  }).format(new Date(date));
}

const ItemTemplate = ({ item }: IItemTemplateProps) => {
  const date = useMemo(
    () => formatDateNoYearSuffix(item.started_at as string),
    [item.started_at],
  );

  const weekDay = useMemo(
    () => formatWeekday(item.started_at as string),
    [item.started_at],
  );

  const duration = useMemo(
    () =>
      formatTimeForDuration(
        Math.floor(
          (new Date(item.completed_at) - new Date(item.started_at)) / 1000,
        ),
      ),
    [item.completed_at, item.started_at],
  );

  return (
    <div className="text-card-foreground flex flex-col gap-4 rounded-xl p-3 shadow-md bg-white">
      <div className="flex items-center gap-2.5 w-full">
        <div className="bg-blue-600 p-1 rounded-lg">
          <CalendarMonthIcon sx={{ color: "white" }} />
        </div>
        <div className="w-full">
          <div className="w-full">
            <div className="text-gray-900">{date}</div>
          </div>
          <div className="flex justify-between w-full baseline">
            <div className="text-xs text-gray-500 flex gap-1">
              <div className="capitalize">{weekDay}</div>
              <div>•</div>
              <div className="capitalize"> {item.title}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-gray-600 baseline">
        <AccessTimeIcon color="action" fontSize="small" />
        <div>
          {new Date(item.started_at).getHours()}:
          {new Date(item.started_at).getMinutes()} -{" "}
          {new Date(item.completed_at).getHours()}:
          {new Date(item.completed_at).getMinutes()}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 ml-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <HourglassBottomIcon color="action" sx={{ fontSize: 16 }} />
            <div>{duration}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IListProps {
  items: IDay[];
}

const List = ({ items }: IListProps) => {
  return (
    <div className="flex flex-col gap-3 px-2">
      <div className="capitalize">Январь 2026</div>
      {items.map((item) => (
        <ItemTemplate key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
