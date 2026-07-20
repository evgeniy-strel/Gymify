import { useMemo } from "react";

import { IBodyWeight } from "../api/BodyWeightService";
import { useBodyWeightListQuery } from "../hooks/query";
import { useDeleteBodyWeight } from "../hooks/mutations";
import { ConnectToActions, TActions } from "../../../actions";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { Skeleton } from "@mui/material";

interface IItemTemplateProps {
  item: IBodyWeight;
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

const DynamicsIcon = ({ item }: IItemTemplateProps) => {
  const dynamics = item.dynamics;
  if (dynamics > 0) {
    return <TrendingUpIcon color="success" />;
  }

  if (dynamics < 0) {
    return <TrendingDownIcon color="error" />;
  }

  return <TrendingFlatIcon color="action" />;
};

const ItemTemplate = ({ item }: IItemTemplateProps) => {
  const date = useMemo<string>(
    () => formatDateNoYearSuffix(item.measured_at),
    [item.measured_at],
  );

  if (item.is_year) {
    return (
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-600">
          {new Date(item.measured_at).getFullYear()}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-sm text-gray-500">{date}</div>
      <div className="flex items-center gap-2">
        <div className="font-semibold">{item.value_kg} кг</div>
        <DynamicsIcon item={item} />
      </div>
    </div>
  );
};

const ItemTemplateWithActions = ConnectToActions(ItemTemplate);

const SkeletonItemTemplate = ({ index }: { index: number }) => {
  if (index === 0) {
    return (
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <Skeleton variant="rounded" animation="wave" height={20} width={50} />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between p-4">
      <Skeleton variant="rounded" animation="wave" height={20} width={80} />
      <Skeleton variant="rounded" animation="wave" height={20} width={60} />
    </div>
  );
};

const COUNT_SKELETONS = 10;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);

const History = () => {
  const { data: items } = useBodyWeightListQuery();
  const deleteBodyWeightMutation = useDeleteBodyWeight();

  const onActionComplete = (actionId: TActions, id: string) => {
    if (actionId === "delete") {
      return deleteBodyWeightMutation.mutateAsync(id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md">
      <div className="text-gray-700 text-xl font-medium p-4 border-b border-gray-200">
        История взвешиваний
      </div>
      <div className="divide-y divide-gray-200">
        {items?.length
          ? items.map((item) => (
              <ItemTemplateWithActions
                key={item.id}
                item={item}
                onActionComplete={onActionComplete}
              />
            ))
          : SKELETON_ITEMS.map((item, index) => (
              <SkeletonItemTemplate key={index} index={index} />
            ))}
      </div>
    </div>
  );
};

export default History;
