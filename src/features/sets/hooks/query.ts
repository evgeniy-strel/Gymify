import { default as SetsService, ISet } from "../api/SetsService";

import { skipToken, useQuery } from "@tanstack/react-query";

interface IUseSetsQuery {
  exerciseId: string | undefined;
}

export function useSetsQuery({ exerciseId }: IUseSetsQuery) {
  return useQuery<ISet[] | null>({
    queryKey: ["sets", exerciseId],
    queryFn: exerciseId ? () => SetsService.get(exerciseId) : skipToken,
  });
}
