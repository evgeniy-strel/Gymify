import { useEffect, useMemo, useState } from "react";

import {
  getExercise,
  getProgram,
  IApproache,
  type IProgram,
  type IExercise,
} from "../../../utils";
import { ApproachesContext } from "./Context";
import List from "./List";

import clsx from "clsx";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

const Header = (props: any) => {
  const { exercise } = props;

  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate(-1);
  };

  return (
    <div
      className={clsx(
        "shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pt-1 pb-2 z-10 shadow-sm"
      )}
    >
      <div className="flex items-center">
        <div className="p-2" onClick={redirectToMain}>
          <ArrowBackIcon />
        </div>
        <div className="text-xl">{exercise.title}</div>
      </div>
    </div>
  );
};

const Approaches = () => {
  const { programId, weekNumber, dayNumber, exerciseId } = useParams();
  const [exercise, setExercise] = useState<IExercise>();
  const [program, setProgram] = useState<IProgram>();

  const completed = useMemo(() => {
    return (
      exercise?.approaches.filter((item: IApproache) => item.isCompleted)
        .length || 0
    );
  }, [exercise]);

  useEffect(() => {
    Promise.all([
      getExercise({ program: programId, title: exerciseTitle }),
      getProgram({ id: programId }),
    ]).then((data: any) => {
      const [exerciseData, programData] = data;
      setExercise(exerciseData);
      setProgram(programData);
    });
  }, [programId]);

  if (!exercise || !program) {
    return <></>;
  }

  return (
    <ApproachesContext.Provider
      value={{ exercise, program, setExercise, setProgram }}
    >
      <div className="bg-gray-100 h-dvh w-full flex flex-col">
        <Header exercise={exercise} />
        <div className="p-3">
          <div className="flex items-baseline justify-between">
            <div className="text-xl font-medium shrink-0">Подходы</div>
            <div className="h-3 bg-gray-200 w-full rounded-full overflow-hidden mx-4">
              <div
                className={clsx(
                  "h-full bg-gradient-to-r transition-all duration-400",
                  program.mainGradient
                )}
                style={{
                  width: (completed / exercise.approaches.length) * 100 + "%",
                }}
              ></div>
            </div>
            <div className="text-m text-gray-500 shrink-0">
              {completed} из {exercise.approaches.length}
            </div>
          </div>
          <div className="py-3">
            <List />
          </div>
          <div className="py-3">{exercise.isCompleted ? "Завершить" : ""}</div>
        </div>
      </div>
    </ApproachesContext.Provider>
  );
};

export default Approaches;
