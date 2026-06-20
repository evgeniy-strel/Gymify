import { IWeek, WeeksService } from "../../utils";

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
      }
    },
  });
}
