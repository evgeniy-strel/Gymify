import { useMemo, useState } from "react";

import SetsList from "./view/SetsList";
import type { ISet } from "./api/SetsService";
import { useSetsQuery } from "./hooks/query";
import { useCreateSet } from "./hooks/mutations";

import { useExerciseQuery } from "../exercises/hooks/query";
import { useFinishExerciseMutation } from "../exercises/hooks/mutations";
import { AddButton, PrimaryButton } from "../../components";
import { useCanCreate } from "../../auth/hooks/query";
import AddForm from "../../shared/view/AddForm/AddForm";

import clsx from "clsx";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Skeleton } from "@mui/material";

const Header = (props: any) => {
  const { exercise } = props;

  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate(-1);
  };

  return (
    <div
      className={clsx(
        "shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pt-1 pb-2 z-10 shadow-sm",
      )}
    >
      <div className="flex items-center">
        <div className="p-2" onClick={redirectToMain}>
          <ArrowBackIcon />
        </div>
        {exercise ? (
          <div className="text-xl">{exercise.title}</div>
        ) : (
          <Skeleton variant="rounded" height={32} width={250} />
        )}
      </div>
    </div>
  );
};

const FIELDS_FOR_ADD_FORM = [
  {
    name: "weight_percent",
    type: "number",
    placeholder: "% от максимума",
    options: {
      min: 1,
      max: 999,
    },
  },
  {
    name: "reps",
    type: "number",
    placeholder: "Количество повторений",
  },
];

const Approaches = () => {
  const navigate = useNavigate();
  const { exerciseId } = useParams();
  const { data: exercise } = useExerciseQuery({
    exerciseId,
  });
  const { data: sets } = useSetsQuery({
    exerciseId,
  });
  const createSetMutation = useCreateSet();

  const [isAdded, setIsAdded] = useState<boolean>(false);
  const finishExerciseMutation = useFinishExerciseMutation();

  const canCreate = useCanCreate();

  const allCompleted = useMemo(() => {
    return (
      Number(sets?.length) > 0 && sets?.every((item: ISet) => item.is_completed)
    );
  }, [sets]);

  const finishExercise = async () => {
    finishExerciseMutation.mutate(exerciseId as string, {
      onSuccess: () => {
        navigate(-1);
      },
    });
  };

  const startAddItem = () => {
    setIsAdded(true);
  };

  const onSaveItem = async (item: Partial<ISet>, duplicate: number) => {
    const newItem = {
      ...item,
      exercise_title: exercise?.title,
      exercise_id: exercise?.id,
      day_id: exercise?.day_id,
    };

    await createSetMutation.mutateAsync({ item: newItem, duplicate });

    closeAddForm();
  };

  const closeAddForm = () => {
    setIsAdded(false);
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col relative">
      <Header exercise={exercise} />
      <div className="px-2 py-3 flex flex-col gap-4 overflow-scroll">
        <div>
          <SetsList items={sets} />
        </div>
        {false && (
          <div className="absolute top-0 left-0 transform h-dvh w-dvw z-10000">
            <div className="w-full"></div>
          </div>
        )}
        {canCreate && (
          <div>
            <AddButton title="Добавить подход" onClick={startAddItem} />
            {isAdded && (
              <AddForm
                onSave={onSaveItem}
                onClose={closeAddForm}
                fields={FIELDS_FOR_ADD_FORM}
                duplicateButton={true}
                description={exercise.title}
              />
            )}
          </div>
        )}
        {allCompleted && (
          <PrimaryButton
            caption="Закончить упражнение"
            isLoading={finishExerciseMutation.isPending}
            icon={TaskAltIcon}
            onClick={finishExercise}
          />
        )}
      </div>
    </div>
  );
};

export default Approaches;
