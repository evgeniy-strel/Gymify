import { DaysService } from "../../utils";
import { getWeekId } from "./helpers";

import { useQuery } from "@tanstack/react-query";

interface IUseDaysQuery {
  programId: string;
  week: string | number;
}

export function useDaysQuery({ programId, week }: IUseDaysQuery) {
  return useQuery({
    queryKey: ["days", getWeekId(programId, week)],
    queryFn: () => DaysService.getAll(programId, week),
  });
}

interface IUseDayQuery {
  dayId: string;
}

export function useDayQuery({ dayId }: IUseDayQuery) {
  return useQuery({
    queryKey: ["day", dayId],
    queryFn: () => DaysService.getById(dayId),
  });
}
