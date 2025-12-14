import api from "../axios";

export interface IDay {
  id: string;
  number: number;
  is_completed: boolean;
  week_id: string;
  title: string;
  created_at: Date;
  exercises_count: number;
}

class DaysService {
  async getAll(programId: string, week: number): Promise<IDay[]> {
    try {
      const res = await api.get(`/days/${programId}/${week}`);
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch days:", error);
      return [];
    }
  }
}

export default new DaysService();
