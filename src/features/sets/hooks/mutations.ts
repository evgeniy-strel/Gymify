import { default as SetsService, ISet } from "../api/SetsService";
import { duplicateCall, useApiError } from "../../../utils";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateSet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Pick<ISet, "id"> & Partial<ISet>) =>
      SetsService.update(item),

    onSuccess: (_, item: Pick<ISet, "id"> & Partial<ISet>) => {
      queryClient.invalidateQueries({
        queryKey: ["exercises", item.day_id],
      });
    },
    onMutate: async (item: Pick<ISet, "id"> & Partial<ISet>) => {
      // Optimistic update для синхронного рендеринга
      const queryKey = ["sets", item.exercise_id];

      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<ISet[] | null>(queryKey);

      queryClient.setQueryData(queryKey, (oldData: ISet[] = []) =>
        oldData.map((oldItem: ISet) => {
          return oldItem.id === item.id ? { ...oldItem, ...item } : oldItem;
        }),
      );

      return { previousData, queryKey };
    },
  });
}

interface ICreateFnParams {
  item: Partial<ISet>;
  duplicate?: number;
}

export function useCreateSet() {
  const queryClient = useQueryClient();

  const createSet = (item: ICreateFnParams["item"]) => {
    return SetsService.create({
      is_completed: false,
      ...item,
    });
  };

  return useMutation({
    mutationFn: ({ item, duplicate = 1 }: ICreateFnParams) =>
      // Параллельный запуск нескольких create
      duplicateCall((count: number) => {
        const sets = queryClient.getQueryData<ISet[] | null>([
          "sets",
          item.exercise_id,
        ]);
        return createSet({ ...item, order: sets ? sets.length + count : 1 });
      }, duplicate),

    onSuccess: (_, { item }: ICreateFnParams) => {
      queryClient.invalidateQueries({
        queryKey: ["sets", item.exercise_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["exercises", item.day_id],
      });
    },
  });
}

export function useDeleteSet() {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (id: string) => SetsService.delete(id),

    onSuccess: (deletedSet: ISet) => {
      queryClient.invalidateQueries({
        queryKey: ["sets", deletedSet.exercise_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["exercises", deletedSet.day_id],
      });
    },
    onError: handleError,
  });
}
