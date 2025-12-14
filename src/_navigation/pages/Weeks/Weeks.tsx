import { useEffect, useState } from "react";

import { ProgramsService, WeeksService, IProgram, IWeek } from "../../../utils";

import { useNavigate, useParams } from "react-router";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
        "shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-1 z-10 shadow-sm"
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
  const navigate = useNavigate();

  const onClick = () => {
    navigate(String(item.number));
  };

  return (
    <div
      className={clsx("p-4 rounded-xl bg-white shadow-md relative", {
        "from-blue-500 to-blue-600 bg-gradient-to-br text-white":
          item.is_completed,
      })}
      onClick={onClick}
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
    </div>
  );
};

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

  const [weeks, setWeeks] = useState<IWeek[]>();
  const [program, setProgram] = useState<IProgram[]>();

  useEffect(() => {
    Promise.all([
      WeeksService.get(programId),
      ProgramsService.getById(programId),
    ])
      .then(([weeksData, programData]) => {
        setWeeks(weeksData);
        setProgram(programData);
      })
      .catch((error: any) => {
        alert("Ошибка загрузки недель и программ", error?.message);
      })
      .finally(() => {});
  }, []);

  return (
    <div className="h-dvh w-full flex flex-col">
      <Header program={program} />
      <div className="py-4 px-3 grid grid-cols-4 gap-3">
        {weeks
          ? weeks.map((item) => <ItemTemplate key={item.id} item={item} />)
          : SKELETON_ITEMS.map((item, index) => (
              <SkeletonItemTemplate key={index} />
            ))}
      </div>
    </div>
  );
};

export default Weeks;
