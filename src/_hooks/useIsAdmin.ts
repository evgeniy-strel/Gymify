import { useMemo } from "react";

import { getIsAdmin } from "../utils";

export function useIsAdmin(): boolean {
  const isAdmin = useMemo(getIsAdmin, []);

  return isAdmin;
}
