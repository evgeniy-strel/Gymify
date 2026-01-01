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

  async update(
    item: Pick<IWeek, "id"> & Partial<IWeek>
  ): Promise<IWeek | null> {
    try {
      const { id, ...fields } = item;
      const res = await api.put(`/weeks/${id}`, fields);
      return res.data;
    } catch (error) {
      console.error("Failed to update set:", error);
      return null;
    }
  }
}

export default new WeeksService();
