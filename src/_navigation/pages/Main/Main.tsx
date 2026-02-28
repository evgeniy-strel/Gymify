import { useEffect, useMemo, useState } from "react";

import { AddButton, AddForm, ProgramCard } from "../../../components";
import { ProgramsService, IProgram, getIsAdmin } from "../../../utils";

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
  const [programs, setPrograms] = useState<IProgram[]>();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const isAdmin = useMemo(getIsAdmin, []);

  const loadData = () => {
    ProgramsService.getAll().then(setPrograms);
  };

  useEffect(() => {
    loadData();
  }, []);

  const startAddItem = () => {
    setIsAdded(true);
  };

  const onSaveItem = async (
    item: Pick<IProgram, "id" | "title" | "description">,
  ) => {
    await ProgramsService.create(item);
    await loadData();
    closeAddForm();
  };

  const closeAddForm = () => {
    setIsAdded(false);
  };

  return (
    <div className="py-4 px-3 flex flex-col gap-3 h-full">
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
          <AddButton onClick={startAddItem} />
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
