import { useEffect, useState } from "react";

import { ProgramCard } from "../../../components";
import { ProgramsService, IProgram } from "../../../utils";

import { Typography } from "@mui/material";

export const Main = () => {
  const [programs, setPrograms] = useState<IProgram[]>();

  useEffect(() => {
    ProgramsService.getAll().then((data: IProgram[]) => setPrograms(data));
  }, []);

  if (!programs) {
    return <></>;
  }

  return (
    <div className="py-4 px-3 flex flex-col gap-3">
      <Typography variant="h4">Программы</Typography>
      {programs.map((program) => (
        <ProgramCard key={program.id} {...program} />
      ))}
    </div>
  );
};
