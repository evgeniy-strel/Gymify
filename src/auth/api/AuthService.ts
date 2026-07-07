import { api } from "../../apiClient";
import {
  getAuthKeyFromLocalStorage,
  removeAuthKeyFromLocalStorage,
} from "../utils/helpers";

export interface IAuthResult {
  success: boolean;
}

interface IAuthParams {
  key?: string;
}

class AuthService {
  async auth({ key }: IAuthParams = {}): Promise<IAuthResult> {
    try {
      const authKey = key ?? getAuthKeyFromLocalStorage();
      if (!authKey) return { success: false };

      const res = await api.post("/auth", {
        key: authKey,
      });
      return res.data;
    } catch (error: any) {
      console.error("Failed to auth", error);
      return { success: false };
    }
  }

  async logout(): Promise<void> {
    removeAuthKeyFromLocalStorage();
  }
}

export default new AuthService();
