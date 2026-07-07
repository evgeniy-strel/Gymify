import type { IWeek } from "./api/WeeksService";
import { useWeeksQuery } from "./hooks/query";
import { useCreateWeek, useDeleteWeek } from "./hooks/mutations";
import { useProgramQuery } from "../programs/hooks/query";

import type { IProgram } from "../programs/api/ProgramsService";
import { useCanCreate } from "../../auth/hooks/query";
import AddButton from "../../shared/AddButton/AddButton";
import { ConnectToActions, TActions } from "../../actions";

import { useNavigate, useParams } from "react-router";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import clsx from "clsx";
import { Skeleton } from "@mui/material";

interface IHeaderProps {
  program?: IProgram;
}

const Header = ({ program }: IHeaderProps) => {
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
        {program ? (
          <div className="flex items-baseline gap-2">
            <div className="text-xl">{program.title}</div>
            <div className="text-m text-gray-500">
              {program.totalWeek} недель
            </div>
          </div>
        ) : (
          <Skeleton width={140} height={32} />
        )}
      </div>
    </div>
  );
};

interface IItemTemplate {
  item: IWeek;
}

const ItemTemplate = ({ item }: IItemTemplate) => {
  return (
    <div
      className={clsx(
        "p-4 rounded-xl bg-white shadow-md relative overflow-hidden",
        {
          "from-blue-500 to-blue-600 bg-gradient-to-br text-white":
            item.is_completed,
        },
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="text-xs">Нед</div>
        <div
          className={clsx("text-2xl", {
            "text-blue-6002": !item.is_completed,
          })}
        >
          {item.number}
        </div>
        {item.is_completed && (
          <div className="absolute top-0 right-0">
            <CheckCircleIcon fontSize="small" />
          </div>
        )}
      </div>
      {!item.is_completed && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-br from-blue-500 to-blue-600 bg-gradient-to-br"
            style={{ width: `${item.progress * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

const ItemTemplateWithActions = ConnectToActions(ItemTemplate);

const SkeletonItemTemplate = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <Skeleton variant="rounded" animation="wave" height={84} />
    </div>
  );
};

const COUNT_SKELETONS = 16;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);

const Weeks = () => {
  const { programId } = useParams();
  const navigate = useNavigate();

  const { data: weeks } = useWeeksQuery({ programId });
  const createWeekMutation = useCreateWeek();
  const deleteWeekMutation = useDeleteWeek();
  const { data: program } = useProgramQuery({ programId });
  const canCreate = useCanCreate();

  const createProgram = async () => {
    if (!programId) {
      return;
    }

    createWeekMutation.mutate({ program_id: programId });
  };

  const onActionComplete = (actionId: TActions, id: string) => {
    if (actionId === "delete") {
      deleteWeekMutation.mutate(id);
    }
  };

  const onItemClick = (id: string) => {
    const item = weeks?.find((item) => item.id === id);
    if (item?.number) {
      navigate(String(item.number));
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Header program={program} />
      {weeks?.length === 0 ? (
        <></>
      ) : (
        <div className="py-4 px-3 grid grid-cols-4 gap-3">
          {weeks
            ? weeks.map((item) => (
                <ItemTemplateWithActions
                  key={item.id}
                  item={item}
                  onClick={onItemClick}
                  onActionComplete={onActionComplete}
                />
              ))
            : SKELETON_ITEMS.map((item, index) => (
                <SkeletonItemTemplate key={index} />
              ))}
        </div>
      )}
      {canCreate && (
        <div className="px-3 py-3">
          <AddButton
            title="Создать неделю"
            isLoading={createWeekMutation.isPending}
            onClick={createProgram}
          />
        </div>
      )}
    </div>
  );
};

export default Weeks;
