import { useState, ChangeEvent, useEffect } from "react";

import styles from "./SetsList.module.less";
import type { ISet } from "../api/SetsService";
import { useUpdateSet } from "../hooks/mutations";

import { useDayQuery } from "../../days/hooks/query";
import { getDayId } from "../../days/utils/helpers";
import { ITimerData } from "../../../utils";
import { Timer } from "../../../components";
import {
  useAppResume,
  useResetTimer,
  useStartTimer,
  useTimerQuery,
} from "../../../hooks";

import CheckIcon from "@mui/icons-material/Check";
import clsx from "clsx";
import { CircularProgress, Skeleton } from "@mui/material";
import { useParams } from "react-router";
import { ConnectToActions } from "../../../actions";

const Header = () => {
  return (
    <div
      className={clsx(
        "px-5 pb-1 text-xs text-gray-500 uppercase tracking-wide",
        styles.GridItem,
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
  isReloading: boolean;
  readOnly: boolean;
  onToggleCheckbox: (isCompleted: boolean, item: ISet) => void;
}

const ItemTemplate = ({
  item,
  index,
  isRest,
  isReloading,
  timerData,
  readOnly,
  onToggleCheckbox,
}: IItemTemplateProps) => {
  const onToggleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    onToggleCheckbox(event.target.checked, item);
  };

  const alertTrainingNotStarted = () => {
    alert("Тренировка не начата");
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
          },
        )}
      >
        <div className="flex items-center justify-center min-w-10 text-center py-2 px-2 rounded-lg text-sm bg-gray-100 text-gray-600">
          #{index + 1}
        </div>
        <div className="w-full text-center py-2 px-2 rounded-lg text-sm bg-gray-100 text-gray-600">
          {item.weight_percent}
        </div>

        <div className="w-full text-center py-2 px-2 rounded-lg text-sm bg-gray-100 text-gray-600">
          {item.reps}
        </div>
        {isReloading && (
          <CircularProgress
            size="100%"
            sx={{ color: item.is_completed ? "white" : "#155dfc" }}
          />
        )}
        {!isReloading && (
          <label className="relative flex">
            <input
              type="checkbox"
              checked={item.is_completed}
              className={clsx(
                "appearance-none shrink-0 w-full h-full border rounded checked:border-gray-800 checked:bg-white",
                {
                  "bg-gray-50 border-gray-200": readOnly,
                  "bg-gray-100 border-gray-300": !readOnly,
                },
              )}
              onChange={readOnly ? alertTrainingNotStarted : onToggleCheckBox}
            />
            {item.is_completed && (
              <CheckIcon
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                sx={{ color: "black" }}
              />
            )}
          </label>
        )}
      </div>
      {isRest && timerData && <Timer className="mt-2.5" data={timerData} />}
    </div>
  );
};

const ItemTemplateWithActions = ConnectToActions(ItemTemplate);

const SkeletonItemTemplate = () => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <Skeleton variant="rounded" animation="wave" height={76} />
    </div>
  );
};

interface IListProps {
  items?: ISet[];
}

const COUNT_SKELETONS = 5;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);
const TIMER_DURATION = 90;

const List = (props: IListProps) => {
  const { items } = props;
  const { programId, weekNumber, dayNumber } = useParams();

  const timerQuery = useTimerQuery();
  const startTimerMutation = useStartTimer();
  const resetTimerMutation = useResetTimer();
  const { data: day } = useDayQuery({
    dayId: getDayId(programId, weekNumber, dayNumber),
  });
  const updateSetMutation = useUpdateSet();

  const timerData = timerQuery?.data?.status;
  const restSetId = timerData?.event;

  const [reloadingItems, setReloadingItems] = useState<string[]>([]);
  const [activeActionsItem, setActiveActionsItem] = useState<string>();

  useEffect(() => {
    timerQuery.refetch();
  }, []);

  useAppResume(timerQuery.refetch);

  const onToggleCheckBox = async (isCompleted: boolean, item: ISet) => {
    const newItem: ISet = { ...item, is_completed: isCompleted };

    setReloadingItems((items) => [...items, newItem.id]);
    updateSetMutation.mutate(newItem);

    const isLast = item.id === items?.at(-1).id;

    if (isCompleted && !isLast) {
      await startTimerMutation.mutateAsync({
        seconds: TIMER_DURATION,
        event: newItem.id,
      });
    } else if (newItem.id === restSetId || isLast) {
      await resetTimerMutation.mutateAsync();
    }

    setReloadingItems((items) =>
      items.filter((itemId) => itemId !== newItem.id),
    );
  };

  const onActionClick = (id) => {
    setActiveActionsItem(id);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Header />
      </div>
      <div className="flex flex-col gap-2.5">
        {items
          ? items.map((item, index) => (
              <ItemTemplateWithActions
                key={item.id}
                itemKey={item.id}
                item={item}
                readOnly={!day?.started_at}
                index={index}
                isRest={restSetId === item.id}
                isReloading={reloadingItems.includes(item.id)}
                timerData={timerData}
                onToggleCheckbox={onToggleCheckBox}
                showActions={activeActionsItem === item.id}
                onClick={() => setActiveActionsItem("")}
                onActionClick={onActionClick}
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
