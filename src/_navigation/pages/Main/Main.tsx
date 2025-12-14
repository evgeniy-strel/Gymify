import { useEffect, useState } from "react";

import { ProgramCard } from "../../../components";
import { ProgramsService, IProgram } from "../../../utils";

import { Typography } from "@mui/material";

const COUNT_SKELETONS = 3;
const SKELETON_ITEMS = new Array(COUNT_SKELETONS).fill(0);

export const Main = () => {
  const [programs, setPrograms] = useState<IProgram[]>();

  useEffect(() => {
    ProgramsService.getAll().then((data: IProgram[]) => setPrograms(data));
  }, []);

  return (
    <div className="py-4 px-3 flex flex-col gap-3">
      <Typography variant="h4">Программы</Typography>
      {programs
        ? programs.map((program) => (
            <ProgramCard key={program.id} {...program} />
          ))
        : SKELETON_ITEMS.map((item, index) => (
            <ProgramCard.Skeleton key={index} />
          ))}
    </div>
  );
};
