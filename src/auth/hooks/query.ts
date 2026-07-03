import AuthService from "../api/AuthService";

import { useQuery } from "@tanstack/react-query";

export function useIsAdmin() {
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: () => AuthService.auth().then((res) => res.success),
  });
}
