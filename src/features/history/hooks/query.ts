import HistoryService from "../api/HistoryService";

import { useQuery } from "@tanstack/react-query";

export function useHistoryQuery() {
  return useQuery({
    queryKey: ["history"],
    queryFn: () => HistoryService.getAll({ grouped: true }),
  });
}
