import { useEffect, useState } from "react";

import { ExerciseCard } from "../../../components";
import { getExercises, getProgram, IExercise } from "../../../utils";

import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DateRangeIcon from "@mui/icons-material/DateRange";
import clsx from "clsx";
import { EPageRoutes } from "../../consts";

const Header = (props: any) => {
  const { program, exercises } = props;

  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate(EPageRoutes.main);
  };

  return (
    <div
      className={clsx(
        "shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-2 z-10 shadow-sm"
      )}
    >
      <div className="flex items-center mb-2">
        <div className="p-2" onClick={redirectToMain}>
          <ArrowBackIcon />
        </div>
        <div
          className={clsx(
            "bg-gradient-to-r bg-clip-text text-transparent text-xl",
            program.mainGradient
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
  );
};

interface IData {
  title: string;
  approaches: number;
}

export const Exercises = () => {
  const { program: programId } = useParams();
  const [exercises, setExercises] = useState<IExercise[]>();
  const [program, setProgram] = useState<any>();

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

  if (!exercises || !program) {
    return <></>;
  }

  return (
    <div className="bg-gray-100 h-dvh w-full flex flex-col">
      <Header program={program} exercises={exercises} />
      <div className="h-full flex flex-col gap-2.5 py-3 overflow-scroll px-3 pb-[72px]">
        {exercises.map((item, index) => (
          <ExerciseCard
            key={item.title}
            index={index + 1}
            data={item}
            gradient={program.mainGradient}
          />
        ))}
      </div>
    </div>
  );
};
