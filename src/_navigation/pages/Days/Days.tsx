import { useCallback, useEffect, useMemo, useState } from "react";

import { getDays, IDay, IWeek } from "../../../utils";
import { EPageRoutes } from "../../consts";

import { useNavigate, useParams } from "react-router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import clsx from "clsx";

interface IHeaderProps {
  program: IWeek;
}

const Header = ({ program }: any) => {
  const { weekNumber } = useParams();
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
        }
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
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(EPageRoutes.days.slice(1) + "/" + item.number);
  }, []);

  const iconUrl = useMemo(() => MAP_ICON[item.title], [item]);

  return (
    <div
      className={clsx("w-full p-5 rounded-xl shadow-sm", {
        "bg-white text-black": !item.is_completed,
        "bg-gradient-to-r from-blue-500 to-blue-600 text-white":
          item.is_completed,
      })}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Icon url={iconUrl} item={item} />
          <div>
            <div className="text-xl">{item.title}</div>
            <div>{item.exercises_count} упражнений</div>
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

const Days = () => {
  const { programId, weekNumber: weekNumberString } = useParams();
  const weekNumber = Number(weekNumberString);

  const [days, setDays] = useState<IDay[]>();

  useEffect(() => {
    getDays(programId, weekNumber).then((data: IDay[]) => setDays(data));
  }, []);

  if (!days) {
    return <>Loading...</>;
  }

  return (
    <div className="h-dvh w-full flex flex-col">
      <Header />
      <div className="py-4 px-3 flex flex-col gap-3">
        {days.map((item) => (
          <ItemTemplate key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Days;
