import { ICheckData, TimersService } from "../../utils";

import { useQuery } from "@tanstack/react-query";

export function useTimerQuery() {
  return useQuery<ICheckData | null>({
    queryKey: ["timer"],
    queryFn: () => TimersService.check(),
  });
}
