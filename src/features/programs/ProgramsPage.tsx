import { lazy, useEffect, useState } from "react";

import { IProgram } from "./api/ProgramsService";
import { useCreateProgram, useDeleteProgram } from "./hooks/mutations";
import { useProgramsQuery } from "./hooks/query";
import ProgramCard from "./view/ProgramCard";

import { AddButton } from "../../components";
import { useIsAdmin } from "../../hooks";
import { ConnectToActions, TActions } from "../../actions";
import { EPageRoutes } from "../../navigation";

import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

const AddForm = lazy(() => import("../../shared/view/AddForm/AddForm"));

const COUNT_SKELETONS = 3;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);

const FIELDS_FOR_ADD_FORM = [
  {
    name: "id",
    type: "string",
    placeholder: "Уникальный идентификатор",
  },
  {
    name: "title",
    type: "string",
    placeholder: "Название",
  },
  {
    name: "description",
    type: "string",
    placeholder: "Описание",
  },
];

const ProgramCardWithActions = ConnectToActions(ProgramCard);

const Main = () => {
  const { data: programs } = useProgramsQuery();
  const createProgramMutation = useCreateProgram();
  const deleteProgramMutation = useDeleteProgram();

  const [isAdded, setIsAdded] = useState<boolean>(false);
  const isAdmin = useIsAdmin();

  const startAddItem = () => {
    setIsAdded(true);
  };

  const onSaveItem = async (
    item: Pick<IProgram, "id" | "title" | "description">,
  ) => {
    await createProgramMutation.mutateAsync(item);
    closeAddForm();
  };

  const closeAddForm = () => {
    setIsAdded(false);
  };

  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate("/" + id + EPageRoutes.weeks);
  };

  const onActionComplete = (actionId: TActions, id: string) => {
    if (actionId === "delete") {
      deleteProgramMutation.mutate(id);
    }
  };

  useEffect(() => {
    setTimeout(() => import("../weeks/WeeksPage"), 1000);
  }, []);

  return (
    <div className="py-4 px-3 flex flex-col gap-3 h-full bg-gradient-to-br from-blue-50 to-white">
      <Typography variant="h4">Программы</Typography>
      {programs
        ? programs.map((program) => (
            <ProgramCardWithActions
              key={program.id}
              item={program}
              onClick={onClick}
              onActionComplete={onActionComplete}
            />
          ))
        : SKELETON_ITEMS.map((item, index) => (
            <ProgramCard.Skeleton key={index} />
          ))}
      {isAdmin && (
        <div>
          <AddButton title="Создать программу" onClick={startAddItem} />
          {isAdded && (
            <AddForm
              onSave={onSaveItem}
              onClose={closeAddForm}
              fields={FIELDS_FOR_ADD_FORM}
              description={`Введите данные программы`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
