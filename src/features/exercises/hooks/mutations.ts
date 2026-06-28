import { useApiError } from "../../../utils";
import {
  default as ExercisesService,
  IExercise,
} from "../api/ExercisesService";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Partial<IExercise>) => ExercisesService.create(item),

    onSuccess: async (_, item: Partial<IExercise>) => {
      await queryClient.invalidateQueries({
        queryKey: ["exercises", item.day_id],
      });
    },
  });
}

export function useFinishExerciseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exerciseId: string) =>
      ExercisesService.update({
        id: exerciseId,
        is_completed: true,
      }),

    onSuccess: (_, exerciseId: string) => {
      queryClient.invalidateQueries({
        queryKey: ["exercises", exerciseId],
      });
    },
  });
}

export function useDeleteExercise() {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (id: string) => ExercisesService.delete(id),

    onSuccess: (deletedExercise: IExercise) => {
      if (deletedExercise) {
        queryClient.invalidateQueries({
          queryKey: ["exercises", deletedExercise.day_id],
        });
      }
    },
    onError: handleError,
  });
}
