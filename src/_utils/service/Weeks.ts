import api from "../axios";

export interface IWeek {
  id: string;
  number: number;
  is_completed: boolean;
  program_id: string;
}

class WeeksService {
  async get(programId: string): Promise<IWeek[]> {
    try {
      const response = await api.get(`weeks/${programId}`);
      return response.data;
    } catch (error) {
      console.error("Error loading week:", error);
      return [];
    }
  }
}

export default new WeeksService();
