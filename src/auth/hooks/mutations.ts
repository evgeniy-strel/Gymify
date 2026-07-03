import { useApiError } from "../../utils";
import AuthService from "../api/AuthService";
import {
  saveAuthKeyToLocalStorage,
  getAuthKeyFromLocalStorage,
} from "../utils/helpers";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: async (newKey?: string) => {
      const key = newKey || getAuthKeyFromLocalStorage();
      if (key) {
        return AuthService.auth({ key });
      } else {
        return { success: false };
      }
    },
    onSuccess: (data, key?: string) => {
      queryClient.setQueryData(["isAdmin"], data.success);

      if (key && key !== getAuthKeyFromLocalStorage()) {
        saveAuthKeyToLocalStorage(key);
      }
    },
    onError: handleError,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["isAdmin"], false);
    },
  });
}
