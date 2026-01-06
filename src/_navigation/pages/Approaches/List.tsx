import React, { useEffect, useState } from "react";

import {
  ICheckData,
  ITimerData,
  SetsService,
  TimersService,
  type ISet,
} from "../../../utils";
import styles from "./List.module.less";

import CheckIcon from "@mui/icons-material/Check";
import clsx from "clsx";
import { Skeleton } from "@mui/material";
import { Timer } from "../../../components";
import { useAppResume } from "../../../hooks";

const Header = () => {
  return (
    <div
      className={clsx(
        "px-5 pb-1 text-xs text-gray-500 uppercase tracking-wide",
        styles.GridItem
      )}
    >
      <div className=""></div>
      <div className="shrink-0 truncate">% от макс</div>
      <div className="shrink-0 truncate">Повторы</div>
      <div className=""></div>
    </div>
  );
};

interface IItemTemplateProps {
  item: ISet;
  index: number;
  timerData: ITimerData;
  isRest: boolean;
  onToggleCheckbox: (isCompleted: boolean, item: ISet) => void;
}

const ItemTemplate = ({
  item,
  index,
  isRest,
  timerData,
  onToggleCheckbox,
}: IItemTemplateProps) => {
  const onToggleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleCheckbox(event.target.checked, item);
  };

  return (
    <div>
      <div
        className={clsx(
          "grid rounded-xl p-5 shadow-sm rounded-xl border-0 bg-white",
          styles.GridItem,
          {
            "bg-white border-gray-200": !item.is_completed,
            "bg-gradient-to-r from-blue-500 to-blue-600": item.is_completed,
          }
        )}
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
      {isRest && timerData && <Timer className="mt-2.5" data={timerData} />}
    </div>
  );
};

const SkeletonItemTemplate = () => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <Skeleton variant="rounded" animation="wave" height={76} />
    </div>
  );
};

interface IListProps {
  items?: ISet[];
  setItems: Function;
}

const COUNT_SKELETONS = 5;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);
const TIMER_DURATION = 90;

const List = (props: IListProps) => {
  const [timerData, setTimerData] = useState<ITimerData>();
  const [restSetId, setRestSetId] = useState<string>();
  const { items, setItems } = props;

  const checkTimer = () => {
    return TimersService.check().then(({ data }) => {
      if (data.status) {
        setRestSetId(data.status.event);
        setTimerData(data.status);
      }
    });
  };

  useEffect(() => {
    checkTimer();
  }, []);
  useAppResume(checkTimer);

  const onToggleCheckBox = async (isCompleted: boolean, item: ISet) => {
    const newItem: ISet = { ...item, is_completed: isCompleted };
    SetsService.update({
      id: newItem.id,
      is_completed: newItem.is_completed,
    });

    const newItems: ISet[] = items.map((_item: ISet, _index: number) => {
      if (_item.id === item.id) {
        return newItem;
      }
      return _item;
    });

    const isLast = item.id === items?.at(-1).id;

    if (isCompleted && !isLast) {
      await TimersService.start({
        seconds: TIMER_DURATION,
        event: newItem.id,
      });
      await checkTimer();
      setRestSetId(newItem.id);
    } else if (newItem.id === restSetId || isLast) {
      setRestSetId(undefined);
    }
    setItems(newItems);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Header />
      </div>
      <div className="flex flex-col gap-2.5">
        {items
          ? items.map((item, index) => (
              <ItemTemplate
                item={item}
                index={index}
                key={index}
                isRest={restSetId === item.id}
                timerData={timerData}
                onToggleCheckbox={onToggleCheckBox}
              />
            ))
          : SKELETON_ITEMS.map((item, index) => (
              <SkeletonItemTemplate key={index} />
            ))}
      </div>
    </div>
  );
};

export default List;
