import React, { useEffect, useMemo, useState } from "react";

import { BodyWeightService, IBodyWeight } from "../../../utils";

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

const ItemTemplate = ({ item }: IItemTemplateProps) => {
  const date = useMemo<string>(
    () => formatDateNoYearSuffix(item.measured_at),
    [item.measured_at]
  );

  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-sm text-gray-500">{date}</div>
      <div className="flex items-center gap-2">
        <div className="text-gray-700 font-semibold">{item.value_kg} кг</div>
      </div>
    </div>
  );
};

const History = () => {
  const [items, setItems] = useState<IBodyWeight[]>();

  const loadData = () => {
    BodyWeightService.getAll().then(setItems);
  };

  useEffect(() => {
    loadData();
  }, []);

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
