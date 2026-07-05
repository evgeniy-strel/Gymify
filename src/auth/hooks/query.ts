import AuthService from "../api/AuthService";

import { useQuery } from "@tanstack/react-query";
import { getAvailableModifyActions } from "../utils/helpers";
import { EAvailableModifyActions } from "../utils/consts";

export function useIsAdmin() {
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: () => AuthService.auth().then((res) => res.success),
  });
}

export function useCanCreate() {
  const { data: isAdmin } = useIsAdmin();
  const isCreatingOn = getAvailableModifyActions().includes(
    EAvailableModifyActions.CREATE,
  );

  return isAdmin && isCreatingOn;
}

export function useCanDelete() {
  const { data: isAdmin } = useIsAdmin();
  const isDeletingOn = getAvailableModifyActions().includes(
    EAvailableModifyActions.DELETE,
  );

  return isAdmin && isDeletingOn;
}
