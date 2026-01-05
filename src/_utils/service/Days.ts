import api from "../axios";

export interface IDay {
  id: string;
  number: number;
  is_completed: boolean;
  week_id: string;
  title: string;
  created_at: Date;
  started_at: Date | null;
  completed_at: Date | null;
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

  async getById(dayId: string): Promise<IDay | null> {
    try {
      const res = await api.get(`/days/${dayId}`);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch day:", error);
      return null;
    }
  }

  async update(item: Pick<IDay, "id"> & Partial<IDay>): Promise<IDay | null> {
    try {
      const { id, ...fields } = item;
      const res = await api.put(`/days/${id}`, fields);
      return res.data;
    } catch (error) {
      console.error("Failed to update set:", error);
      return null;
    }
  }
}

export default new DaysService();
