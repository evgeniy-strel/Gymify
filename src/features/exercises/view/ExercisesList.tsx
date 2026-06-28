import ExerciseCard from "./ExerciseCard";
import { useDeleteExercise } from "../hooks/mutations";
import { IExercise } from "../api/ExercisesService";

import { ICheckData } from "../../../utils";
import { ConnectToActions, TActions } from "../../../actions";

import { useNavigate } from "react-router";

const COUNT_SKELETONS = 5;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);

const ItemTemplateWithActions = ConnectToActions(ExerciseCard);

interface IProps {
  exercises: IExercise[];
  timerData: ICheckData | null;
}

const ExercisesList = ({ exercises, timerData }: IProps) => {
  const navigate = useNavigate();
  const deleteDayMutation = useDeleteExercise();

  const onClick = (id: string) => {
    navigate(id);
  };

  const onActionComplete = (actionId: TActions, id: string) => {
    if (actionId === "delete") {
      deleteDayMutation.mutate(id);
    }
  };

  return (
    <>
      {exercises
        ? exercises.map((item, index) => (
            <ItemTemplateWithActions
              key={item.id}
              itemKey={item.id}
              index={index + 1}
              item={item}
              timerData={timerData?.status}
              onClick={onClick}
              onActionComplete={onActionComplete}
            />
          ))
        : SKELETON_ITEMS.map((item, index) => (
            <ExerciseCard.Skeleton key={index} />
          ))}
    </>
  );
};

export default ExercisesList;
