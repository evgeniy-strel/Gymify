/* Библиотека для работы с авторизацией и правами */
export {
  default as AuthService,
  type IAuthResult,
} from "./auth/api/AuthService";
export { useAuth, useLogout } from "./auth/hooks/mutations";
export { useIsAdmin, useCanCreate, useCanDelete } from "./auth/hooks/query";
export {
  getAuthKeyFromLocalStorage,
  saveAuthKeyToLocalStorage,
  removeAuthKeyFromLocalStorage,
} from "./auth/utils/helpers";
export { EAvailableModifyActions } from "./auth/utils/consts";
