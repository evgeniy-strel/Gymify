import { lazy, useEffect, useState } from "react";

import { IProgram } from "./api/ProgramsService";
import { useCreateProgram, useDeleteProgram } from "./hooks/mutations";
import { useProgramsQuery } from "./hooks/query";
import ProgramCard from "./view/ProgramCard";

import { AddButton } from "../../components";
import { useCanCreate } from "../../auth/hooks/query";
import { ConnectToActions, TActions } from "../../actions";
import { EPageRoutes } from "../../navigation";

import SettingsIcon from "@mui/icons-material/Settings";
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

const Header = () => {
  const navigate = useNavigate();

  const openSettings = () => {
    navigate(EPageRoutes.settings);
  };

  return (
    <div className="shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-1 z-10 shadow-sm">
      <div className="flex items-center justify-between p-2">
        <div className="text-xl">Программы</div>
        <SettingsIcon onClick={openSettings} />
      </div>
    </div>
  );
};

const ProgramCardWithActions = ConnectToActions(ProgramCard);

const Main = () => {
  const { data: programs } = useProgramsQuery();
  const createProgramMutation = useCreateProgram();
  const deleteProgramMutation = useDeleteProgram();

  const [isAdded, setIsAdded] = useState<boolean>(false);
  const canCreate = useCanCreate();

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
    <div className="h-full flex flex-col">
      <Header />
      <div className="py-4 px-3 flex flex-col gap-3 h-full bg-gray-100 to-white">
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
        {canCreate && (
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
    </div>
  );
};

export default Main;
