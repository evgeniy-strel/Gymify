import { useCallback, useMemo, useState } from "react";

import { IDay } from "./api/DaysService";
import { useCreateDay, useDeleteDay } from "./hooks/mutations";
import { useDaysQuery } from "./hooks/query";

import { AddButton, PrimaryButton } from "../../components";
import { getExerciseWordForm } from "../../utils";
import { EPageRoutes } from "../../navigation";
import { useIsAdmin } from "../../hooks";
import { getWeekId } from "../weeks/utils/helpers";
import { useUpdateWeek } from "../weeks/hooks/mutations";
import AddForm from "../../shared/view/AddForm/AddForm";
import { ConnectToActions, TActions } from "../../actions";

import { useNavigate, useParams } from "react-router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DoneIcon from "@mui/icons-material/Done";
import { Skeleton } from "@mui/material";
import clsx from "clsx";

const Header = () => {
  const { weekNumber } = useParams();
  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate(-1);
  };

  return (
    <div
      className={clsx(
        "shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-1 z-10 shadow-sm",
      )}
    >
      <div className="flex items-center">
        <div className="p-2" onClick={redirectToMain}>
          <ArrowBackIcon />
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-xl">{weekNumber} неделя</div>
        </div>
      </div>
    </div>
  );
};

const Icon = (props: any) => {
  const { url, item } = props;

  return (
    <div
      className={clsx(
        "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg p-2 shrink-0 bg-gradient-to-br from-blue-500 to-blue-600",
        {
          "border-1": item.is_completed,
        },
      )}
    >
      <img className="w-full h-full" src={url} />
    </div>
  );
};

const MAP_ICON = {
  Ноги: "/icons/legs-2.svg",
  Спина: "/icons/back.svg",
  Грудь: "/icons/chest.svg",
};

interface IProps {
  item: IDay;
}

const ItemTemplate = ({ item }: IProps) => {
  const iconUrl = useMemo(() => MAP_ICON[item.title], [item]);

  return (
    <div
      className={clsx("w-full p-5 rounded-xl shadow-sm", {
        "bg-white text-black": !item.is_completed,
        "bg-gradient-to-r from-blue-500 to-blue-600 text-white":
          item.is_completed,
      })}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {iconUrl && <Icon url={iconUrl} item={item} />}
          <div>
            <div className="text-xl">{item.title}</div>
            <div>{getExerciseWordForm(item.exercises_count)}</div>
          </div>
        </div>
        {item.is_completed ? (
          <DoneIcon className="ml-auto" sx={{ color: "white" }} />
        ) : (
          <ArrowForwardIosIcon
            className="ml-auto"
            fontSize="small"
            color="action"
          />
        )}
      </div>
    </div>
  );
};

const ItemTemplateWithActions = ConnectToActions(ItemTemplate);

const SkeletonItemTemplate = () => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <Skeleton variant="rounded" animation="wave" height={104} />
    </div>
  );
};

const COUNT_SKELETONS = 3;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);

const FIELDS_FOR_ADD_FORM = [
  {
    name: "title",
    type: "string",
    placeholder: "Название дня",
  },
];

const Days = () => {
  const { programId, weekNumber } = useParams();
  const navigate = useNavigate();

  const { data: days } = useDaysQuery({ programId, week: weekNumber });
  const createDayMutation = useCreateDay();
  const updateWeekMutation = useUpdateWeek();
  const deleteDayMutation = useDeleteDay();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const isAdmin = useIsAdmin();
  const weekId = useMemo(
    () => getWeekId(programId, weekNumber),
    [programId, weekNumber],
  );
  const allCompleted = useMemo(() => {
    return (
      Number(days?.length) > 0 && days?.every((item: IDay) => item.is_completed)
    );
  }, [days]);

  const finishWeek = async () => {
    updateWeekMutation.mutate(
      {
        id: weekId as string,
        is_completed: true,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      },
    );
  };

  const startAddItem = () => {
    setIsAdded(true);
  };

  const onSaveItem = async (item: Pick<IDay, "title">) => {
    await createDayMutation.mutateAsync({
      ...item,
      week_id: weekId,
    });
    closeAddForm();
  };

  const closeAddForm = () => {
    setIsAdded(false);
  };

  const onClick = (id: string) => {
    const dayNumber = days?.find((item) => item.id === id)?.number;
    navigate(EPageRoutes.days.slice(1) + "/" + dayNumber);
  };

  const onActionComplete = (actionId: TActions, id: string) => {
    if (actionId === "delete") {
      deleteDayMutation.mutate(id);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <div className="py-4 px-3">
        {days?.length === 0 ? (
          <></>
        ) : (
          <div className="flex flex-col gap-3">
            {days
              ? days.map((item) => (
                  <ItemTemplateWithActions
                    key={item.id}
                    item={item}
                    onClick={onClick}
                    onActionComplete={onActionComplete}
                  />
                ))
              : SKELETON_ITEMS.map((item, index) => (
                  <SkeletonItemTemplate key={index} />
                ))}
            {allCompleted && (
              <PrimaryButton
                caption="Закончить неделю"
                isLoading={updateWeekMutation.isPending}
                icon={TaskAltIcon}
                onClick={finishWeek}
              />
            )}
          </div>
        )}
        {isAdmin && (
          <div className="pt-3">
            <AddButton title="Создать день" onClick={startAddItem} />
            {isAdded && (
              <AddForm
                onSave={onSaveItem}
                onClose={closeAddForm}
                fields={FIELDS_FOR_ADD_FORM}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Days;
