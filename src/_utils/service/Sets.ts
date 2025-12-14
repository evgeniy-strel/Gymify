import { supabase } from "../supabase";
import api from "../axios";

export interface ISet {
  id: string;
  reps: number;
  weight_percent: number | null;
  is_completed: boolean;
  order: number;
  day_id: string;
  exercise_id: string;
  exercise_title: string;
  created_at: Date;
}

class SetsService {
  async get(exerciseId: string) {
    try {
      const res = await api.get(`/sets/${exerciseId}`);
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch sets:", error);
      return [];
    }
  }

  async create(item: Partial<ISet>): Promise<ISet | null> {
    try {
      const res = await api.post("/sets", item);
      return res.data;
    } catch (error) {
      console.error("Failed to create set:", error);
      return null;
    }
  }

  async update(item: Pick<ISet, "id"> & Partial<ISet>): Promise<ISet | null> {
    try {
      const { id, ...fields } = item;
      const res = await api.put(`/sets/${id}`, fields);
      return res.data;
    } catch (error) {
      console.error("Failed to update set:", error);
      return null;
    }
  }
}

export default new SetsService();
