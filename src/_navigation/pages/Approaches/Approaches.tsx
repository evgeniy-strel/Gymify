import { useEffect, useMemo, useState } from "react";

import {
  ExercisesService,
  getExerciseById,
  getSets,
  type IExercise,
  type ISet,
} from "../../../utils";
import List from "./List";

import clsx from "clsx";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

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
  const { exerciseId } = useParams();
  const [sets, setSets] = useState<ISet[]>();
  const [exercise, setExercise] = useState<IExercise>();

  const allCompleted = useMemo(() => {
    return sets?.every((item: ISet) => item.is_completed);
  }, [sets]);

  useEffect(() => {
    Promise.all([getSets(exerciseId), getExerciseById(exerciseId)]).then(
      (data) => {
        setSets(data[0]);
        setExercise(data[1]);
      }
    );
  }, [exerciseId]);

  const finishExercise = () => {
    ExercisesService.update({
      id: exerciseId as string,
      is_completed: true,
    });
  };

  if (!sets || !exercise) {
    return <></>;
  }

  return (
    // <ApproachesContext.Provider
    //   value={{ exercise, program, setExercise, setProgram }}
    // >
    <div className="bg-gray-100 h-dvh w-full flex flex-col">
      <Header exercise={exercise} />
      <div className="px-2 py-3">
        {/* <div className="flex items-baseline justify-between">
          <div className="text-xl font-medium shrink-0">Подходы</div>
          <div className="h-3 bg-gray-200 w-full rounded-full overflow-hidden mx-4">
            <div
              className={clsx(
                "h-full bg-gradient-to-r transition-all duration-400 from-blue-500 to-blue-600"
              )}
              style={{
                width: (countCompleted / sets?.length || 1) * 100 + "%",
              }}
            ></div>
          </div>
          <div className="text-m text-gray-500 shrink-0">
            {countCompleted} из {sets?.length}
          </div>
        </div> */}
        <div>
          <List items={sets} setItems={setSets} />
        </div>
        {allCompleted && (
          <div
            className="rounded-md w-full mt-4 bg-blue-600 text-white h-14 flex items-center justify-center text-m"
            onClick={finishExercise}
          >
            <div className="flex justify-between gap-2">
              <div>Завершить</div>
              <TaskAltIcon />
            </div>
          </div>
        )}
      </div>
    </div>
    // </ApproachesContext.Provider>
  );
};

export default Approaches;
