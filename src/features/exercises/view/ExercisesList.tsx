import { useState } from "react";

import ExerciseCard from "./ExerciseCard";
import { IExercise } from "../api/ExercisesService";
import { ICheckData } from "../../../utils";
import { ConnectToActions } from "../../../actions";
import { useNavigate } from "react-router";

const COUNT_SKELETONS = 5;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);

const ItemTemplateWithActions = ConnectToActions(ExerciseCard);

interface IProps {
  exercises: IExercise[];
  timerData: ICheckData | null;
}

const ExercisesList = ({ exercises, timerData }: IProps) => {
  const [activeActionsItem, setActiveActionsItem] = useState<string>();
  const navigate = useNavigate();

  const onActionClick = (id: string) => {
    setActiveActionsItem((prev) => (prev === id ? "" : id));
  };

  const onClick = (id: string) => {
    navigate(id);
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
              showActions={activeActionsItem === item.id}
              onClick={onClick}
              onActionClick={onActionClick}
            />
          ))
        : SKELETON_ITEMS.map((item, index) => (
            <ExerciseCard.Skeleton key={index} />
          ))}
    </>
  );
};

export default ExercisesList;
