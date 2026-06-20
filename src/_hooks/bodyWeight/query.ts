import { BodyWeightService } from "../../utils";

import { useQuery } from "@tanstack/react-query";

export function useBodyWeightListQuery() {
  return useQuery({
    queryKey: ["bodyWeightList"],
    queryFn: () => BodyWeightService.getAll({ grouped: true }),
  });
}

export function useBodyWeightGraphQuery() {
  return useQuery({
    queryKey: ["bodyWeightGraph"],
    queryFn: () => BodyWeightService.getGraphData(),
  });
}

export function useCurrentWeightQuery() {
  return useQuery({
    queryKey: ["currentWeight"],
    queryFn: () => BodyWeightService.getCurrent(),
  });
}
