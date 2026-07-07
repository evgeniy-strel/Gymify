import { MouseEventHandler, useMemo, useState } from "react";

import Graph from "./view/BodyWeightGraph";
import History from "./view/BodyWeightHistory";
import { useCurrentWeightQuery } from "./hooks/query";
import { useCreateBodyWeight } from "./hooks/mutations";
import { formatDateNoYearSuffix } from "../../utils";
import AddForm from "../../shared/AddForm/AddForm";
import { useCanCreate } from "../../auth/hooks/query";

import { Skeleton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { Dayjs } from "dayjs";

const AddButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className="flex bg-blue-600 p-1 rounded-full shadow-md"
      onClick={onClick}
    >
      <AddIcon fontSize="small" sx={{ color: "white" }} />
    </div>
  );
};

interface IProps {
  startAddItem: MouseEventHandler<HTMLDivElement>;
}

const Header = ({ startAddItem }: IProps) => {
  const { data: currentWeight } = useCurrentWeightQuery();
  const navigate = useNavigate();
  const canCreate = useCanCreate();
  const lastMeasure = useMemo(
    () =>
      currentWeight?.measured_at
        ? formatDateNoYearSuffix(currentWeight.measured_at)
        : "",
    [currentWeight?.measured_at],
  );

  const redirectBack = () => {
    navigate(-1);
  };

  return (
    <div className="shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-2 z-10 shadow-sm">
      <div className="flex items-center justify-between px-2 pt-1.5">
        <div onClick={redirectBack}>
          <ArrowBackIcon />
        </div>
        <div className="text-xl">Текущий вес</div>
        {canCreate ? (
          <AddButton onClick={startAddItem} />
        ) : (
          <div className="w-[28px]"></div>
        )}
      </div>
      <div className="text-3xl flex items-baseline gap-1.5 font-semibold text-center justify-center">
        <div>
          {currentWeight ? (
            currentWeight?.value_kg
          ) : (
            <Skeleton
              variant="rounded"
              animation="wave"
              height={30}
              width={32}
            />
          )}
        </div>
        <div>кг</div>
      </div>
      <div className="flex gap-1 items-center text-sm text-gray-500 ml-10">
        <div>Последнее взвешивание:</div>
        {lastMeasure ? (
          lastMeasure
        ) : (
          <Skeleton variant="rounded" animation="wave" height={20} width={90} />
        )}
      </div>
    </div>
  );
};

const FIELDS_FOR_ADD_FORM = [
  {
    name: "value_kg",
    type: "number",
    placeholder: "Введите вес",
  },
  {
    name: "measured_at",
    type: "date",
    placeholder: "Дата",
  },
];

const BodyWeight = () => {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const createBodyWeightMutation = useCreateBodyWeight();

  const startAddItem = () => {
    setIsAdded(true);
  };

  const onSaveItem = async (item: { value_kg: number; measured_at: Dayjs }) => {
    await createBodyWeightMutation.mutateAsync({
      value_kg: item.value_kg,
      measured_at: item.measured_at.toISOString(),
    });
    closeAddForm();
  };

  const closeAddForm = () => {
    setIsAdded(false);
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col">
      <Header startAddItem={startAddItem} />
      <div className="flex flex-col pt-4 gap-4 overflow-scroll pb-4">
        <Graph />
        <History />
      </div>
      <div>
        {isAdded && (
          <AddForm
            onSave={onSaveItem}
            onClose={closeAddForm}
            fields={FIELDS_FOR_ADD_FORM}
          />
        )}
      </div>
    </div>
  );
};

export default BodyWeight;
