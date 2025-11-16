import { useCallback, useEffect, useMemo, useState } from "react";

import { getDays, IDay, IWeek } from "../../../utils";

import { useNavigate, useParams } from "react-router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  const { url } = props;

  return (
    <div
      className={clsx(
        "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg p-2 shrink-0 from-blue-500 to-blue-600"
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

  const onClick = useCallback(() => {}, []);

  const iconUrl = useMemo(() => MAP_ICON[item.title], [item]);

  return (
    <div className="w-full p-5 rounded-xl bg-white shadow-sm" onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Icon url={iconUrl} />
          <div>
            <div className="text-xl">{item.title}</div>
            <div>{item.exercises_count} упражнений</div>
          </div>
        </div>
        <ArrowForwardIosIcon fontSize="small" color="action" />
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
    return <></>;
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
