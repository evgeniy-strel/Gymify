import { TimersService } from "../../utils";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useResetTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => TimersService.reset(),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["timer"],
      });
    },
  });
}

export function useStartTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { seconds: number; event: string }) =>
      TimersService.start(params),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["timer"],
      });
    },
  });
}
