import React, { MouseEventHandler, useState } from "react";

import Graph from "./Graph";
import { AddForm } from "../../../components";

import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import History from "./History";
import { BodyWeightService, IBodyWeight } from "../../../utils";
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

const Header = (props: any) => {
  const navigate = useNavigate();

  const redirectBack = () => {
    navigate(-1);
  };

  return (
    <div className="shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-2 z-10 shadow-sm">
      <div className="flex items-center justify-between px-2 pt-1.5">
        <div onClick={redirectBack}>
          <ArrowBackIcon />
        </div>
        <div className="flex items-baseline gap-1.5">
          <div className="text-xl">Текущий вес -</div>
          <div className="text-xl flex items-baseline gap-1.5 font-semibold">
            <div className="">78.6</div>
            <div>кг</div>
          </div>
        </div>
        <AddButton />
      </div>
      <div className="text-sm text-gray-500 text-center">
        Последнее взвешивание - 8 января 2026
      </div>
    </div>
  );
};

interface IProps {
  startAddItem: MouseEventHandler<HTMLDivElement>;
}

const Header2 = ({ startAddItem }: IProps) => {
  const navigate = useNavigate();

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
        <AddButton onClick={startAddItem} />
      </div>
      <div className="text-3xl flex items-baseline gap-1.5 font-semibold text-center justify-center">
        <div className="">78.6</div>
        <div>кг</div>
      </div>
      <div className="text-sm text-gray-500 ml-10">
        Последнее взвешивание: 8 января 2026
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

export const Progress = () => {
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const startAddItem = () => {
    setIsAdded(true);
  };

  const onSaveItem = async (item: { value_kg: number; measured_at: Dayjs }) => {
    await BodyWeightService.create({
      value_kg: item.value_kg,
      measured_at: item.measured_at.toISOString(),
    });
    closeAddForm();
  };

  const closeAddForm = () => {
    setIsAdded(false);
  };

  return (
    <div className="bg-gray-100 h-dvh w-full flex flex-col">
      <Header2 startAddItem={startAddItem} />
      <div className="flex flex-col pt-4 gap-4 overflow-scroll pb-[72px]">
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
