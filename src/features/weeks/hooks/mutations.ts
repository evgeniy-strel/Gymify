import { useApiError } from "../../../hooks";
import { IWeek, default as WeeksService } from "../api/WeeksService";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type TCreateWeek = Pick<IWeek, "program_id">;

export function useCreateWeek() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: TCreateWeek) => WeeksService.create(item),

    onSuccess: async (_, item: TCreateWeek) => {
      await queryClient.invalidateQueries({
        queryKey: ["weeks", item.program_id],
      });
      queryClient.refetchQueries({
        queryKey: ["programs"],
      });
    },
  });
}

type TUpdateWeek = Pick<IWeek, "id"> & Partial<IWeek>;

export function useUpdateWeek() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: TUpdateWeek) => WeeksService.update(item),

    onSuccess: async (updatedItem: IWeek | null) => {
      // БЛ уже отдает обновленную неделю, сразу сетим на стейт
      if (updatedItem) {
        queryClient.setQueryData(["week", updatedItem.id], updatedItem);
      }
      // Если неделя завершена, то обновляем список недель программы
      if (updatedItem?.is_completed) {
        await queryClient.refetchQueries({
          queryKey: ["weeks", updatedItem.program_id],
        });
        queryClient.refetchQueries({
          queryKey: ["programs"],
        });
      }
    },
  });
}

export function useDeleteWeek() {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (id: string) => WeeksService.delete(id),

    onSuccess: (deletedWeek: IWeek) => {
      queryClient.invalidateQueries({
        queryKey: ["weeks", deletedWeek.program_id],
      });
      queryClient.refetchQueries({
        queryKey: ["programs"],
      });
    },
    onError: handleError,
  });
}
