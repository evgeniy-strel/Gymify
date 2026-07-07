import { ICheckData, default as TimersService } from "../api/Timers";

import { useQuery } from "@tanstack/react-query";

export function useTimerQuery() {
  return useQuery<ICheckData | null>({
    queryKey: ["timer"],
    queryFn: () => TimersService.check(),
  });
}
