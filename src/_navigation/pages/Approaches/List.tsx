import React, { useContext, useState } from "react";

import type { IApproache, IExercise, IProgram } from "../../../utils";
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
  item: IApproache;
  index: number;
  onToggleCheckbox: (isCompleted: boolean, index: number) => void;
}

const ItemTemplate = ({
  item,
  index,
  onToggleCheckbox,
}: IItemTemplateProps) => {
  const onToggleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleCheckbox(event.target.checked, index);
  };

  return (
    <div
      className={clsx("grid rounded-xl p-4 border-2", styles.GridItem, {
        "bg-white border-gray-200": !item.isCompleted,
        "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300":
          item.isCompleted,
      })}
    >
      <div className="flex items-center justify-center min-w-10 text-center py-2 px-2 rounded-lg text-sm bg-gray-100 text-gray-600">
        #{index + 1}
      </div>
      <input
        className="w-full text-center py-2 px-2 rounded-lg text-sm bg-gray-100 text-gray-600"
        type="number"
        value={item.weight}
      />
      <input
        className="w-full text-center py-2 px-2 rounded-lg text-sm bg-gray-100 text-gray-600"
        type="number"
        value={item.count}
      />
      {/* <input className="shrink-0 size-6 bg-gray-100" type="checkbox"></input> */}
      <label className="relative flex">
        <input
          type="checkbox"
          checked={item.isCompleted}
          className="appearance-none shrink-0 w-full h-full bg-gray-100 border border-gray-300 rounded checked:border-gray-800 checked:bg-gray-900"
          onChange={onToggleCheckBox}
        />
        {item.isCompleted && (
          <CheckIcon
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            sx={{ color: "white" }}
          />
        )}
      </label>
    </div>
  );
};

const List = () => {
  const { program, exercise, setExercise, setProgram } =
    useContext(ApproachesContext);

  const onToggleCheckBox = (isCompleted: boolean, index: number) => {
    const approaches: IApproache[] = exercise.approaches.map(
      (item: IApproache, _index: number) => {
        if (index === _index) {
          return { ...item, isCompleted };
        }
        return item;
      }
    );

    setExercise({
      ...exercise,
      approaches,
      isCompleted: approaches.every((item) => item.isCompleted),
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Header />
      {exercise.approaches.map((item, index) => (
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
