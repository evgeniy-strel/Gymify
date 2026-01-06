import { useEffect, useMemo, useState } from "react";

import {
  AddButton,
  AddForm,
  PrimaryButton,
  ExerciseCard,
} from "../../../components";
import {
  DaysService,
  ExercisesService,
  getIsAdmin,
  IDay,
  IExercise,
} from "../../../utils";
import { useAppResume } from "../../../hooks";

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
        <div>{exercises ? exercises.length : "..."} упражнений</div>
      </div>
    </div>
  );
};

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
  const [exercises, setExercises] = useState<IExercise[]>();
  const [day, setDay] = useState<IDay>();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const navigate = useNavigate();

  const isAdmin = useMemo(getIsAdmin, []);
  const trainingDuration = useMemo<number>(
    () =>
      day?.started_at
        ? Math.floor((Date.now() - new Date(day?.started_at)) / 1000)
        : 0,
    [day?.started_at]
  );

  const dayId = useMemo(
    () => `${programId}_${weekNumber}_${dayNumber}`,
    [programId, weekNumber, dayNumber]
  );

  const allCompleted = useMemo(() => {
    return (
      Number(exercises?.length) > 0 &&
      exercises?.every((item: IExercise) => item.is_completed)
    );
  }, [exercises]);

  const loadData = () => {
    Promise.all([
      ExercisesService.getAll(programId, weekNumber, dayNumber),
      DaysService.getById(dayId),
    ]).then((data) => {
      setExercises(data[0]);
      setDay(data[1]);
    });
  };

  useEffect(() => {
    loadData();
  }, [programId, weekNumber, dayNumber]);
  useAppResume(loadData);

  const startAddItem = () => {
    setIsAdded(true);
  };

  const onSaveItem = async (item: Partial<IExercise>) => {
    const answer = await ExercisesService.create({
      ...item,
      day_id: dayId,
      order: exercises ? exercises.length + 1 : 1,
    });
    await loadData();
    closeAddForm();
  };

  const closeAddForm = () => {
    setIsAdded(false);
  };

  const finishDay = async () => {
    await DaysService.update({
      id: dayId as string,
      completed_at: new Date(),
      is_completed: true,
    });
    navigate(-1);
  };

  const startTraining = async () => {
    const data = await DaysService.update({
      id: dayId as string,
      started_at: new Date(),
    });
    setDay(data);
  };

  return (
    <div className="bg-gray-100 h-dvh w-full flex flex-col">
      <Header exercises={exercises} day={day} />
      <div className="flex flex-col gap-2.5 py-3 overflow-scroll px-3 pb-[72px]">
        {exercises && !allCompleted && !day?.started_at && (
          <PrimaryButton
            caption="Начать тренировку"
            icon={PlayArrowIcon}
            iconPosition="beforeText"
            onClick={startTraining}
          />
        )}
        {exercises
          ? exercises.map((item, index) => (
              <ExerciseCard key={item.id} index={index + 1} item={item} />
            ))
          : SKELETON_ITEMS.map((item, index) => (
              <ExerciseCard.Skeleton key={index} />
            ))}
        {isAdmin && (
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
        {day?.started_at && !day.completed_at && (
          <PrimaryButton
            readOnly={!allCompleted && exercises.length !== 0}
            iconPosition="beforeText"
            icon={TaskAltIcon}
            caption="Закончить тренировку"
            onClick={finishDay}
            withStopWatch={true}
            stopWatchSeconds={trainingDuration}
          />
        )}
      </div>
    </div>
  );
};
