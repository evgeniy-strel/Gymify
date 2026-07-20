import { useApiError } from "../../../hooks";
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

export function useDeleteBodyWeight() {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (id: string) => BodyWeightService.delete(id),

    onSuccess: async (deletedBodyWeight: IBodyWeight | null) => {
      if (deletedBodyWeight) {
        await queryClient.invalidateQueries({
          queryKey: ["currentWeight"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["bodyWeightGraph"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["bodyWeightList"],
        });
      }
    },
    onError: handleError,
  });
}
