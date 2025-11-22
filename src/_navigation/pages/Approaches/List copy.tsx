import React, { useContext, useState } from "react";

import type { IApproache, IExercise, IProgram, ISet } from "../../../utils";
import { ApproachesContext } from "./Context";
import styles from "./List.module.less";

import { Checkbox, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import clsx from "clsx";

const Header = () => {
  return (
    <div
      className={clsx(
        "px-4 pb-1 text-xs text-gray-500 uppercase tracking-wide",
        styles.GridItem
      )}
    >
      <div className=""></div>
      <div className="shrink-0 truncate">Вес (кг)</div>
      <div className="shrink-0 truncate">Повторы</div>
      <div className=""></div>
    </div>
  );
};

interface IItemTemplateProps {
  item: ISet;
  index: number;
  onToggleCheckbox: (isCompleted: boolean, item: ISet) => void;
}

const ItemTemplate = ({
  item,
  index,
  onToggleCheckbox,
}: IItemTemplateProps) => {
  const onToggleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleCheckbox(event.target.checked, item);
  };

  return (
    <div
      className={clsx("grid rounded-xl p-4 border-2", styles.GridItem, {
        "bg-white border-gray-200": !item.is_completed,
        "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-700":
          item.is_completed,
      })}
    >
      <div className="flex items-center justify-center min-w-10 text-center py-2 px-2 rounded-lg text-sm bg-gray-100 text-gray-600">
        #{index + 1}
      </div>
      <input
        className="w-full text-center py-2 px-2 rounded-lg text-sm bg-gray-100 text-gray-600"
        type="number"
        value={item.weight_percent}
      />
      <input
        className="w-full text-center py-2 px-2 rounded-lg text-sm bg-gray-100 text-gray-600"
        type="number"
        value={item.reps}
      />
      {/* <input className="shrink-0 size-6 bg-gray-100" type="checkbox"></input> */}
      <label className="relative flex">
        <input
          type="checkbox"
          checked={item.is_completed}
          className="appearance-none shrink-0 w-full h-full bg-gray-100 border border-gray-300 rounded checked:border-gray-800 checked:bg-white"
          onChange={onToggleCheckBox}
        />
        {item.is_completed && (
          <CheckIcon
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            sx={{ color: "black" }}
          />
        )}
      </label>
    </div>
  );
};

interface IListProps {
  items: ISet[];
  setItems: Function;
}

const List = (props: IListProps) => {
  const { items, setItems } = props;

  const onToggleCheckBox = (isCompleted: boolean, item: ISet) => {
    const newItems: ISet[] = items.map((_item: ISet, _index: number) => {
      if (_item.id === item.id) {
        return { ...item, is_completed: isCompleted };
      }
      return _item;
    });

    setItems(newItems);

    // setExercise({
    //   ...items,
    //   approaches,
    //   isCompleted: approaches.every((item) => item.isCompleted),
    // });
  };

  return (
    <div className="flex flex-col gap-2">
      <Header />
      {items.map((item, index) => (
        <ItemTemplate
          item={item}
          index={index}
          key={index}
          onToggleCheckbox={onToggleCheckBox}
        />
      ))}
    </div>
  );
};

export default List;
