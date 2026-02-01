import { useEffect, useState } from "react";

import { HistoryService, IDay } from "../../../utils";
import List from "./List";

import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import clsx from "clsx";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-1 z-10 shadow-sm",
      )}
    >
      <div className="flex items-center p-2">
        <div className="text-xl">История</div>
      </div>
    </div>
  );
};

export const Calendar = () => {
  const [history, setHistory] = useState<IDay[]>();
  useEffect(() => {
    HistoryService.getAll().then(setHistory);
  }, []);
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <div className="pt-2 overflow-scroll pb-[92px]">
        {history && <List items={history} />}
      </div>
    </div>
  );
};
