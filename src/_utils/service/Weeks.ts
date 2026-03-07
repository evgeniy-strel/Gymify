import api from "../axios";

export interface IWeek {
  id: string;
  number: number;
  is_completed: boolean;
  program_id: string;
  progress: number;
}

class WeeksService {
  async create(item: Pick<IWeek, "program_id">): Promise<IWeek | null> {
    try {
      const res = await api.post("/weeks", item);
      return res.data;
    } catch (error: any) {
      console.error("Error creating program:", error);
      return null;
    }
  }

  async get(programId: string): Promise<IWeek[]> {
    try {
      const response = await api.get(`/weeks/${programId}`);
      return response.data;
    } catch (error) {
      console.error("Error loading week:", error);
      return [];
    }
  }

  async update(
    item: Pick<IWeek, "id"> & Partial<IWeek>,
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
