import { api } from "../../../utils";
import type { IDay } from "../../days/api/DaysService";

class HistoryService {
  async getAll({ grouped }: { grouped?: boolean } = {}): Promise<IDay[]> {
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
