import { useCallback } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router";
import { EPageRoutes } from "../../navigation";
import { Skeleton } from "@mui/material";

const ProgressBar = (props: any) => {
  const { currentWeek, totalWeek } = props;

  const percent = totalWeek === 0 ? 0 : (currentWeek / totalWeek) * 100;

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

interface IProps {
  id: string;
  title: string;
  description: string;
  currentWeek: number;
  totalWeek: number;
}

const ProgramCard = (props: IProps) => {
  const { id, title, currentWeek, totalWeek } = props;

  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate("/" + id + EPageRoutes.weeks);
  }, [id]);

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-md p-5"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-blue-600 text-xl mb-1">{title}</div>
          <div className="text-gray-600 text-sm">
            {totalWeek === 0
              ? "Недели программы не созданы"
              : `${totalWeek}-недельная программа`}
          </div>
        </div>
        <ArrowForwardIosIcon fontSize="small" color="action" />
      </div>
      {totalWeek > 0 && (
        <div className="mt-3">
          <ProgressBar currentWeek={currentWeek} totalWeek={totalWeek} />
        </div>
      )}
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="w-full rounded-2xl overflow-hidden">
      <Skeleton variant="rounded" animation="wave" height={131} />
    </div>
  );
};

ProgramCard.Skeleton = SkeletonCard;

export default ProgramCard;
