import { IProgram, default as ProgramsService } from "../api/ProgramsService";
import { useApiError } from "../../../utils";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type TCreateProgram = Pick<IProgram, "id" | "title" | "description">;

export function useCreateProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: TCreateProgram) => ProgramsService.create(item),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (id: string) => ProgramsService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: handleError,
  });
}
