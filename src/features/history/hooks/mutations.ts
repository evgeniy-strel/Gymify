import { useMutation, useQueryClient } from "@tanstack/react-query";
import DaysService from "../../days/api/DaysService";

export function useUpdateHistoryEndTime() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: { id: string; completed_at: string }) => {
      const day = await DaysService.update(item);
      if (!day) throw new Error("Не удалось сохранить время окончания");
      return day;
    },
    onSuccess: async (day) => {
      queryClient.setQueryData(["day", day.id], day);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["history"] }),
        queryClient.invalidateQueries({ queryKey: ["days", day.week_id] }),
      ]);
    },
  });
}
