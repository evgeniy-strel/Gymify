import { useEffect, useMemo, useState } from "react";

import { AddButton, AddForm, ExerciseCard } from "../../../components";
import { ExercisesService, getIsAdmin, IExercise } from "../../../utils";

import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DateRangeIcon from "@mui/icons-material/DateRange";
import clsx from "clsx";
import { Skeleton } from "@mui/material";

const Header = (props: any) => {
  const { weekNumber, dayNumber } = useParams();
  const { exercises } = props;

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
        <div className="text-xl">День {dayNumber}</div>
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
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const isAdmin = useMemo(getIsAdmin, []);

  const loadData = () => {
    ExercisesService.getAll(programId, weekNumber, dayNumber).then(
      (data: IExercise[]) => {
        setExercises(data);
      }
    );
  };

  useEffect(() => {
    loadData();
  }, [programId]);

  const startAddItem = () => {
    setIsAdded(true);
  };

  const onSaveItem = async (item: Partial<IExercise>) => {
    const dayId = `${programId}_${weekNumber}_${dayNumber}`;

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

  return (
    <div className="bg-gray-100 h-dvh w-full flex flex-col">
      <Header exercises={exercises} />
      <div className="flex flex-col gap-2.5 py-3 overflow-scroll px-3 pb-[72px]">
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
      </div>
    </div>
  );
};
