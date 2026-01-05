import { useEffect, useState } from "react";

import { HistoryService, IDay } from "../../../utils";
import List from "./List";

import { Typography } from "@mui/material";

export const Calendar = () => {
  const [history, setHistory] = useState<IDay[]>();
  useEffect(() => {
    HistoryService.getAll().then(setHistory);
  }, []);
  return (
    <div className="py-4 px-3">
      <Typography variant="h4">История</Typography>
      <div className="mt-4">{history && <List items={history} />}</div>
    </div>
  );
};
