import {
  AUTH_LOCAL_STORAGE_NAME,
  AVAILABLE_MODIFY_ACTIONS,
  EAvailableModifyActions,
} from "./consts";

export const getAuthKeyFromLocalStorage = (): string | null => {
  return localStorage.getItem(AUTH_LOCAL_STORAGE_NAME);
};

export const saveAuthKeyToLocalStorage = (key: string) => {
  localStorage.setItem(AUTH_LOCAL_STORAGE_NAME, key);
};

export const removeAuthKeyFromLocalStorage = () => {
  localStorage.removeItem(AUTH_LOCAL_STORAGE_NAME);
};

export const getAvailableModifyActions = (): string[] => {
  return JSON.parse(localStorage.getItem(AVAILABLE_MODIFY_ACTIONS) || "[]");
};

export const saveAvailableModifyAction = (action: EAvailableModifyActions) => {
  const savedActions = getAvailableModifyActions();
  const newActions = [...new Set([...savedActions, action])];

  localStorage.setItem(AVAILABLE_MODIFY_ACTIONS, JSON.stringify(newActions));
};

export const removeAvailableModifyAction = (
  action: EAvailableModifyActions,
) => {
  const savedActions = getAvailableModifyActions();
  const newActions = savedActions.filter((item) => item !== action);

  localStorage.setItem(AVAILABLE_MODIFY_ACTIONS, JSON.stringify(newActions));
};
