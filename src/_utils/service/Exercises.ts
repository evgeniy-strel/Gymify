import api from "../axios";

export interface IExercise {
  id: string;
  day_id: string;
  title: string;
  is_completed: boolean;
  sets_count: number;
  created_at: Date;
}

class ExercisesService {
  async create(item: Partial<IExercise>): Promise<IExercise | null> {
    try {
      const res = await api.post("/exercises", item);
      return res.data;
    } catch (error: any) {
      console.error("Error creating exercise:", error);
      return null;
    }
  }

  async getAll(
    programId: string,
    week: number,
    day: number
  ): Promise<IExercise[]> {
    try {
      const res = await api.get(`/exercises/${programId}/${week}/${day}`);
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch exercises:", error);
      return [];
    }
  }

  async getById(exerciseId: string): Promise<IExercise | null> {
    try {
      const res = await api.get(`/exercises/${exerciseId}`);
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch exercise:", error);
      return null;
    }
  }

  async update(
    item: Pick<IExercise, "id"> & Partial<IExercise>
  ): Promise<IExercise | null> {
    try {
      const res = await api.put(`/exercises/${item.id}`, item);
      return res.data;
    } catch (error: any) {
      console.error("Error updating exercise:", error);
      return null;
    }
  }
}

export default new ExercisesService();
