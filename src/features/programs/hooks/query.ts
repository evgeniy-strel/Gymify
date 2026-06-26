import { default as ProgramsService } from "../api/ProgramsService";

import { useQuery } from "@tanstack/react-query";

export function useProgramsQuery() {
  return useQuery({
    queryKey: ["programs"],
    queryFn: () => ProgramsService.getAll(),
  });
}

interface IUseProgramQuery {
  programId: string;
}

export function useProgramQuery({ programId }: IUseProgramQuery) {
  return useQuery({
    queryKey: ["program", programId],
    queryFn: () => ProgramsService.getById(programId),
  });
}
