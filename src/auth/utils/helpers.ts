import { AUTH_LOCAL_STORAGE_NAME } from "./consts";

export const getAuthKeyFromLocalStorage = (): string | null => {
  return localStorage.getItem(AUTH_LOCAL_STORAGE_NAME);
};

export const saveAuthKeyToLocalStorage = (key: string) => {
  localStorage.setItem(AUTH_LOCAL_STORAGE_NAME, key);
};

export const removeAuthKeyFromLocalStorage = () => {
  localStorage.removeItem(AUTH_LOCAL_STORAGE_NAME);
};
