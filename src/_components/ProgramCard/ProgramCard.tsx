import React, { useCallback } from "react";

import clsx from "clsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./ProgramCard.module.less";
import { useNavigate } from "react-router";
import { EPageRoutes } from "../../navigation";
import { Skeleton } from "@mui/material";

const ProgressBar = (props: any) => {
  const { currentWeek, totalWeek } = props;

  const percent = (currentWeek / totalWeek) * 100;

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <div className="">Прогресс цикла</div>
        <div className="">
          {currentWeek} / {totalWeek} неделя
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          style={{ width: `${percent}%` }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
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
  currentWeek: number;
  totalWeek: number;
}

const ProgramCard = (props: IProps) => {
  const { id, title, description, currentWeek, totalWeek } = props;

  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate("/" + id + EPageRoutes.weeks);
  }, [id]);

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-md p-5"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-blue-600 text-xl mb-1">{title}</div>
          <div className="text-gray-600 text-sm">
            {totalWeek}-недельная программа
          </div>
        </div>
        <ArrowForwardIosIcon fontSize="small" color="action" />
      </div>
      <ProgressBar currentWeek={currentWeek} totalWeek={totalWeek} />
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <Skeleton variant="rounded" animation="wave" height={131} />
    </div>
  );
};

ProgramCard.Skeleton = SkeletonCard;

export default ProgramCard;
