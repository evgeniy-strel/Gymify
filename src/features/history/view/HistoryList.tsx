import { useMemo } from "react";

import { formatTimeForDuration, IDay } from "../../../utils";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { Skeleton } from "@mui/material";

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

const GroupTemplate = ({ item }: IItemTemplateProps) => {
  const date = new Date(item.started_at)
    .toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    })
    .replace("г.", "")
    .trim();

  return (
    <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex justify-between">
      <div className="text-sm font-semibold text-gray-600 capitalize">
        {date}
      </div>
      <div className="text-sm text-gray-500">{item.title}</div>
    </div>
  );
};

const SkeletonItemTemplate = ({ index }: { index: number }) => {
  if (index === 0) {
    return (
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex justify-between">
        <Skeleton variant="rounded" animation="wave" height={20} width={75} />
        <Skeleton variant="rounded" animation="wave" height={20} width={90} />
      </div>
    );
  }
  return (
    <div className="text-card-foreground flex flex-col gap-2 p-3 bg-white">
      <Skeleton variant="rounded" animation="wave" height={24} width={200} />
      <Skeleton variant="rounded" animation="wave" height={20} width={145} />
    </div>
  );
};

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
    <div className="text-card-foreground flex flex-col gap-2 p-3 bg-white">
      <div className="w-full flex items-baseline gap-3">
        <div className="text-gray-900">{date}</div>
        <div className="flex justify-between baseline">
          <div className="text-xs text-gray-500 flex gap-1">
            <div className="capitalize">{weekDay}</div>
            <div>•</div>
            <div className="capitalize"> {item.title}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-gray-600 baseline">
        <AccessTimeIcon color="action" fontSize="small" />
        <div>
          {String(new Date(item.started_at).getHours()).padStart(2, "0")}:
          {String(new Date(item.started_at).getMinutes()).padStart(2, "0")} -{" "}
          {String(new Date(item.completed_at).getHours()).padStart(2, "0")}:
          {String(new Date(item.completed_at).getMinutes()).padStart(2, "0")}
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

const RenderTemplate = ({ item }: IItemTemplateProps) => {
  if (item.is_month) {
    return <GroupTemplate item={item} />;
  }

  return <ItemTemplate item={item} />;
};

const COUNT_SKELETONS = 15;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);

interface IListProps {
  items?: IDay[];
}

const List = ({ items }: IListProps) => {
  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {items
        ? items.map((item) => <RenderTemplate key={item.id} item={item} />)
        : SKELETON_ITEMS.map((item, index) => (
            <SkeletonItemTemplate key={index} index={index} />
          ))}
    </div>
  );
};

export default List;
