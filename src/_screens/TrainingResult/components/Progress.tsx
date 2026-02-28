import { useEffect, useState } from "react";

import { IWorkoutResult } from "../../../utils";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import CountUp from "react-countup";

const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-in-out"
        style={{ width: value + "%" }}
      ></div>
    </div>
  );
};

const Progress = ({ data }: { data: IWorkoutResult }) => {
  const oldValue = data.progress.before;
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setValue(data.progress.after);
    }, 250);
  }, [data.progress]);

  return (
    <div className="bg-white w-full text-card-foreground flex flex-col gap-2 rounded-xl p-5 border-0 shadow-lg">
      <div className="flex justify-between items-baseline">
        <div className="text-gray-600">Прогресс</div>
        <div className="flex items-center gap-1">
          <div className="text-gray-400 line-through">{oldValue}%</div>
          <ArrowRightAltOutlinedIcon color="disabled" sx={{ fontSize: 18 }} />
          <div className="text-blue-600">
            <CountUp start={0} end={value} duration={1} /> %
          </div>
        </div>
      </div>
      <ProgressBar value={value} />
    </div>
  );
};

export default Progress;
