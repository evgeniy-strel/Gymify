import { useState } from "react";

import { AddButton, AddForm, ProgramCard } from "../../../components";
import { IProgram } from "../../../utils";
import { useCreateProgram, useIsAdmin, useProgramsQuery } from "../../../hooks";

import { Typography } from "@mui/material";

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

export const Main = () => {
  const { data: programs } = useProgramsQuery();
  const createProgramMutation = useCreateProgram();

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

  return (
    <div className="py-4 px-3 flex flex-col gap-3 h-full bg-gradient-to-br from-blue-50 to-white">
      <Typography variant="h4">Программы</Typography>
      {programs
        ? programs.map((program) => (
            <ProgramCard key={program.id} {...program} />
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
