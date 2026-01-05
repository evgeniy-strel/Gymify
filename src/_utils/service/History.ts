import api from "../axios";
import type { IDay } from "./Days";

class HistoryService {
  async getAll(): Promise<IDay[]> {
    try {
      const res = await api.get(`/history`);
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch history:", error);
      return [];
    }
  }
}

export default new HistoryService();
