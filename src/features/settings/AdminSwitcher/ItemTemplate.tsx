import { ElementType } from "react";

import clsx from "clsx";
import { Switch } from "@mui/material";

interface IProps {
  title: string;
  description: string;
  isOn: boolean;
  icon: ElementType;
  onToggle: () => void;
}

/* Шаблон записи в настройках */
const ItemTemplate = ({
  title,
  description,
  isOn,
  icon: Icon,
  onToggle,
}: IProps) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={clsx("p-2 rounded-full", {
          "bg-blue-100": isOn,
          "bg-gray-100": !isOn,
        })}
      >
        <Icon color={isOn ? "primary" : "action"} />
      </div>

      <div className="flex flex-col">
        <div className="text-gray-800 font-medium">{title}</div>
        <div className="text-gray-400 text-sm">{description}</div>
      </div>

      <div className="ml-auto" onClick={onToggle}>
        <Switch checked={isOn} readOnly sx={{ pointerEvents: "none" }} />
      </div>
    </div>
  );
};

export default ItemTemplate;
