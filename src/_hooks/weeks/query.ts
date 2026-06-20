import { WeeksService } from "../../utils";

import { useQuery } from "@tanstack/react-query";

interface IUseWeeksQuery {
  programId: string;
}

export function useWeeksQuery({ programId }: IUseWeeksQuery) {
  return useQuery({
    queryKey: ["weeks", programId],
    queryFn: () => WeeksService.get(programId),
  });
}
