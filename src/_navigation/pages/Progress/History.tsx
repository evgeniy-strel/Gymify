import React, { useEffect, useMemo, useState } from "react";

import { BodyWeightService, IBodyWeight } from "../../../utils";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

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
    [item.measured_at]
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

interface IProps {
  reloadKey: number;
}

const History = ({ reloadKey }: IProps) => {
  const [items, setItems] = useState<IBodyWeight[]>();

  const loadData = () => {
    BodyWeightService.getAll({ grouped: true }).then(setItems);
  };

  useEffect(() => {
    loadData();
  }, [reloadKey]);

  if (!items?.length) {
    return <></>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md">
      <div className="text-gray-700 text-xl font-medium p-4 border-b border-gray-200">
        История взвешиваний
      </div>
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <ItemTemplate key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default History;
