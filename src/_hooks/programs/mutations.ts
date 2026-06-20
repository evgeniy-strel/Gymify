import { IProgram, ProgramsService } from "../../utils";

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
