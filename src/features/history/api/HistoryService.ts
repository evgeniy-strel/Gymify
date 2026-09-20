import { api } from "../../../apiClient";
import type { IDay } from "../../days/api/DaysService";

export interface IHistoryItem extends IDay {
  is_month?: boolean;
}

class HistoryService {
  async getAll({ grouped }: { grouped?: boolean } = {}): Promise<IHistoryItem[]> {
    try {
      const res = await api.get(`/history`, {
        params: {
          grouped,
        },
      });
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch history:", error);
      return [];
    }
  }
}

export default new HistoryService();
