import React, { useCallback } from "react";

import clsx from "clsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./ProgramCard.module.less";
import { useNavigate } from "react-router";
import { EPageRoutes } from "../../navigation";

const ProgressBar = (props: any) => {
  const { currentWeek, countWeek, gradient } = props;

  const percent = (currentWeek / countWeek) * 100;

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <div className="">Прогресс цикла</div>
        <div className="">{percent}%</div>
      </div>
      <div className="h-1.5 bg-gray-200 w-full rounded-full overflow-hidden">
        <div
          style={{ width: `${percent}%` }}
          className={clsx("h-full bg-gradient-to-r", gradient)}
        ></div>
      </div>
    </div>
  );
};

const Icon = (props: any) => {
  const { className, url } = props;

  return (
    <div
      className={clsx(
        "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg p-2 shrink-0",
        className
      )}
    >
      <img className="w-full h-full" src={url} />
    </div>
  );
};

interface IProps {
  id: string;
  title: string;
  description: string;
  className: string;
  mainGradient: string;
  addGradient: string;
  iconUrl: string;
  currentWeek: number;
  countWeek: number;
}

const ProgramCard = (props: IProps) => {
  const {
    id,
    title,
    description,
    className,
    mainGradient,
    addGradient,
    iconUrl,
    currentWeek,
    countWeek,
  } = props;

  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(EPageRoutes.exercises + "/" + id);
  }, [id]);

  return (
    <div
      className={clsx(
        "p-6 rounded-xl cursor-pointer bg-gradient-to-br",
        className,
        addGradient
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center mb-4">
          <Icon className={mainGradient} url={iconUrl} />
          <div>
            <div className="text-xl">{title}</div>
            <div>
              Неделя {currentWeek} из {countWeek}
            </div>
          </div>
        </div>
        <ArrowForwardIosIcon fontSize="small" color="action" />
      </div>
      <ProgressBar
        gradient={mainGradient}
        currentWeek={currentWeek}
        countWeek={countWeek}
      />
    </div>
  );
};

export default ProgramCard;
