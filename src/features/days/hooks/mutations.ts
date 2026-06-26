import { default as DaysService, IDay } from "../api/DaysService";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateDay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Pick<IDay, "week_id" | "title">) =>
      DaysService.create(item),

    onSuccess: async (_, item: Pick<IDay, "week_id" | "title">) => {
      await queryClient.invalidateQueries({ queryKey: ["days", item.week_id] });
    },
  });
}

export function useUpdateDay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Pick<IDay, "id"> & Partial<IDay>) =>
      DaysService.update(item),

    onSuccess: (updatedDay: IDay | null) => {
      // БЛ уже отдает обновленный день, сразу сетим на стейт
      if (updatedDay) {
        queryClient.setQueryData(["day", updatedDay.id], updatedDay);
      }
      // Если тренировка завершена, то обновляем историю
      if (updatedDay?.completed_at) {
        queryClient.invalidateQueries({ queryKey: ["history"] });
      }
    },
  });
}
