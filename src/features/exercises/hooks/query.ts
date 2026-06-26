import {
  default as ExercisesService,
  IExercise,
} from "../api/ExercisesService";

import { getDayId } from "../../days/utils/helpers";

import { skipToken, useQuery } from "@tanstack/react-query";

interface IUseExercisesQuery {
  programId: string;
  week: string | number;
  day: string | number;
}

export function useExercisesQuery({
  programId,
  week,
  day,
}: IUseExercisesQuery) {
  return useQuery<IExercise[]>({
    queryKey: ["exercises", getDayId(programId, week, day)],
    queryFn: () => ExercisesService.getAll(programId, week, day),
  });
}

interface IUseExerciseQuery {
  exerciseId: string | undefined;
}

export function useExerciseQuery({ exerciseId }: IUseExerciseQuery) {
  return useQuery<IExercise | null>({
    queryKey: ["exercise", exerciseId],
    queryFn: exerciseId
      ? () => ExercisesService.getById(exerciseId)
      : skipToken,
  });
}
