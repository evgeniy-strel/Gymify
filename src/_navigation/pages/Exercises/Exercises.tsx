import { useEffect, useMemo, useState } from "react";

import { AddButton, AddForm, PrimaryButton } from "../../../components";
import {
  getExerciseWordForm,
  IDay,
  IExercise,
  IWorkoutResult,
  WorkoutResultsService,
} from "../../../utils";
import {
  getDayId,
  useAppResume,
  useCreateExercise,
  useDayQuery,
  useExercisesQuery,
  useIsAdmin,
  useTimerQuery,
  useUpdateDay,
} from "../../../hooks";
import { TrainingResult } from "../../../screens";
import ExerciseCard from "./ExerciseCard/ExerciseCard";

import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Header = (props: any) => {
  const { weekNumber, dayNumber } = useParams();
  const { exercises, day } = props;

  const navigate = useNavigate();

  const redirectBack = () => {
    navigate(-1);
  };

  return (
    <div className="shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-2 z-10 shadow-sm">
      <div className="flex items-center mb-2">
        <div className="p-2" onClick={redirectBack}>
          <ArrowBackIcon />
        </div>
        <div className="text-xl">{day?.title}</div>
      </div>
      <div className="flex items-center gap-2 px-2 text-sm text-gray-600">
        <DateRangeIcon fontSize="small" color="action" />
        <div>Неделя {weekNumber}</div>
        <div className="h-1 w-1 rounded-full bg-gray-400"></div>
        <div>{exercises && getExerciseWordForm(exercises?.length)}</div>
      </div>
    </div>
  );
};

function useTrainingDuration(day: IDay | null | undefined): number {
  if (!day || day.completed_at) {
    return 0;
  }

  return Math.floor((Date.now() - new Date(day?.started_at)) / 1000);
}

const FIELDS_FOR_ADD_FORM = [
  {
    name: "title",
    type: "string",
    placeholder: "Название упражнения",
  },
];

const COUNT_SKELETONS = 5;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);

export const Exercises = () => {
  const { programId, weekNumber, dayNumber } = useParams();
  const dayId = useMemo(
    () => getDayId(programId, weekNumber, dayNumber),
    [programId, weekNumber, dayNumber],
  );

  const { data: exercises } = useExercisesQuery({
    programId,
    week: weekNumber,
    day: dayNumber,
  });
  const createExerciseMutation = useCreateExercise();
  const { data: day } = useDayQuery({ dayId });
  const updateDayMutation = useUpdateDay();
  const { data: timerData, refetch: refetchTimer } = useTimerQuery();

  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [workoutResults, setWorkoutResults] = useState<IWorkoutResult>();
  const [isFinishingDay, setIsFinishingDay] = useState<boolean>(false);

  const isAdmin = useIsAdmin();
  const trainingDuration = useTrainingDuration(day);
  const allCompleted = useMemo<boolean>(() => {
    return Boolean(
      Number(exercises?.length) > 0 &&
      exercises?.every((item: IExercise) => item.is_completed),
    );
  }, [exercises]);

  useEffect(() => {
    refetchTimer();
  }, []);

  // под вопросом
  // useAppResume(refetchTimer);

  const startAddItem = () => {
    setIsAdded(true);
  };

  const onSaveItem = async (item: Partial<IExercise>) => {
    await createExerciseMutation.mutateAsync({
      ...item,
      day_id: dayId,
      order: exercises ? exercises.length + 1 : 1,
    });
    closeAddForm();
  };

  const closeAddForm = () => {
    setIsAdded(false);
  };

  const loadShowResults = async () => {
    if (!programId || !weekNumber || !dayNumber) {
      return;
    }

    return WorkoutResultsService.get(programId, weekNumber, dayNumber);
  };

  const finishDay = async () => {
    setIsFinishingDay(true);
    await updateDayMutation.mutateAsync({
      id: dayId as string,
      completed_at: new Date(),
      is_completed: true,
    });
    const data = await loadShowResults();
    setWorkoutResults(data);
    setIsFinishingDay(false);
  };

  const startTraining = async () => {
    updateDayMutation.mutate({
      id: dayId as string,
      started_at: new Date(),
    });
  };

  const onCloseResults = async () => {
    setWorkoutResults(undefined);
  };

  return (
    <>
      <div className="bg-gray-100 h-full w-full flex flex-col">
        <Header exercises={exercises} day={day} />
        <div className="flex flex-col gap-2.5 py-3 overflow-scroll px-3">
          {Boolean(exercises?.length && !day?.started_at) && (
            <PrimaryButton
              caption="Начать тренировку"
              icon={PlayArrowIcon}
              iconPosition="beforeText"
              isLoading={updateDayMutation.isPending}
              onClick={startTraining}
            />
          )}
          {exercises
            ? exercises.map((item, index) => (
                <ExerciseCard
                  key={item.id}
                  index={index + 1}
                  item={item}
                  timerData={timerData?.status}
                />
              ))
            : SKELETON_ITEMS.map((item, index) => (
                <ExerciseCard.Skeleton key={index} />
              ))}
          {isAdmin && day && !day?.completed_at && (
            <div>
              <AddButton onClick={startAddItem} />
              {isAdded && (
                <AddForm
                  onSave={onSaveItem}
                  onClose={closeAddForm}
                  fields={FIELDS_FOR_ADD_FORM}
                  description={`Неделя ${weekNumber} / День ${dayNumber}`}
                />
              )}
            </div>
          )}
          {(isFinishingDay ||
            (exercises && day && day.started_at && !day.completed_at)) && (
            <PrimaryButton
              readOnly={!allCompleted}
              iconPosition="beforeText"
              icon={TaskAltIcon}
              caption="Закончить тренировку"
              onClick={finishDay}
              withStopWatch={true}
              isLoading={isFinishingDay}
              stopWatchSeconds={trainingDuration}
            />
          )}
        </div>
      </div>
      {workoutResults && (
        <TrainingResult data={workoutResults} onClose={onCloseResults} />
      )}
    </>
  );
};
