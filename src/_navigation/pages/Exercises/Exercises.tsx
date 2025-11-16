import { useEffect, useState } from "react";

import { ExerciseCard } from "../../../components";
import {
  getExercise,
  getExercises,
  getProgram,
  IExercise,
} from "../../../utils";
import { EPageRoutes } from "../../consts";

import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DateRangeIcon from "@mui/icons-material/DateRange";
import clsx from "clsx";

const Header = (props: any) => {
  const { programId, weekNumber, dayNumber } = useParams();
  const { program, exercises } = props;

  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate(-1);
  };

  return (
    <div className="shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-2 z-10 shadow-sm">
      <div className="flex items-center mb-2">
        <div className="p-2" onClick={redirectToMain}>
          <ArrowBackIcon />
        </div>
        <div className="text-xl">День {dayNumber}</div>
      </div>
      <div className="flex items-center gap-2 px-2 text-sm text-gray-600">
        <DateRangeIcon fontSize="small" color="action" />
        <div>Неделя {weekNumber}</div>
        <div className="h-1 w-1 rounded-full bg-gray-400"></div>
        <div>{exercises.length} упражнений</div>
      </div>
    </div>
  );
};

interface IData {
  title: string;
  approaches: number;
}

export const Exercises = () => {
  const { programId, weekNumber, dayNumber } = useParams();
  const [exercises, setExercises] = useState<IExercise[]>();

  useEffect(() => {
    getExercises(programId, weekNumber, dayNumber).then((data: IExercise[]) => {
      setExercises(data);
    });
  }, [programId]);

  if (!exercises) {
    return <></>;
  }

  return (
    <div className="bg-gray-100 h-dvh w-full flex flex-col">
      <Header exercises={exercises} />
      <div className="h-full flex flex-col gap-2.5 py-3 overflow-scroll px-3 pb-[72px]">
        {exercises.map((item, index) => (
          <ExerciseCard key={item.id} index={index + 1} item={item} />
        ))}
      </div>
    </div>
  );
};
