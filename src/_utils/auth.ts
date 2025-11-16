export enum ERoles {
  user = "user",
  admin = "admin",
}

export const getIsAdmin = (): boolean => {
  return localStorage.getItem("role") === ERoles.admin;
};

export const saveRoleToLocalStorage = (role: ERoles) => {
  localStorage.setItem("role", role);
};
