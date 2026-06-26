import {
  default as BodyWeightService,
  IBodyWeight,
} from "../api/BodyWeightService";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateBodyWeight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Partial<IBodyWeight>) => BodyWeightService.create(item),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["currentWeight"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["bodyWeightGraph"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["bodyWeightList"],
      });
    },
  });
}
