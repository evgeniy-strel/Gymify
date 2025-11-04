import { useEffect, useState } from "react";

import { ExerciseCard } from "../../../components";
import { getExercises, getProgram } from "../../../utils";

import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DateRangeIcon from "@mui/icons-material/DateRange";
import clsx from "clsx";
import { EPageRoutes } from "../../consts";

interface IData {
  title: string;
  approaches: number;
}

export const Exercises = () => {
  const { program: programId } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState();
  const [program, setProgram] = useState();

  useEffect(() => {
    Promise.all([
      getExercises({ program: programId, week: 1 }),
      getProgram({ id: programId }),
    ]).then((data: any) => {
      const [exercisesData, programData] = data;
      setExercises(exercisesData);
      setProgram(programData);
    });
  }, [programId]);

  const redirectToMain = () => {
    navigate(EPageRoutes.main);
  };

  if (!exercises || !program) {
    return <></>;
  }

  return (
    <div className="bg-gray-100 h-dvh w-full flex flex-col">
      <div
        className={clsx(
          "shrink-0 bg-gradient-to-br via-white backdrop-blur-sm border-b border-gray-200 px-2 py-4 z-10 shadow-sm",
          `from-${program.colors[0]}-50 to-${program.colors[1]}-50`
        )}
      >
        <div className="flex items-center mb-2">
          <div className="p-2" onClick={redirectToMain}>
            <ArrowBackIcon />
          </div>
          <div
            className={clsx(
              "bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent text-xl",
              `from-${program.colors[0]}-500 to-${program.colors[1]}-500`
            )}
          >
            {program.title}
          </div>
        </div>
        <div className="flex items-center gap-2 px-2 text-sm text-gray-600">
          <DateRangeIcon fontSize="small" color="action" />
          <div>
            Неделя {program.currentWeek} / {program.countWeek}
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-400"></div>
          <div>{exercises.length} упражнений</div>
        </div>
      </div>
      <div className="h-full flex flex-col gap-4 py-4 overflow-scroll px-3 pb-[72px]">
        {exercises.map((item, index) => (
          <ExerciseCard key={item.title} index={index + 1} data={item} />
        ))}
      </div>
    </div>
  );
};
