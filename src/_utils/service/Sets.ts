import { supabase } from "../supabase";

export interface ISet {
  id: string;
  reps: number;
  weight_percent: number | null;
  is_completed: boolean;
  order: number;
  day_id: string;
  exercise_id: string;
  created_at: Date;
}

class SetsService {
  async get(exerciseId: string) {
    const { data, error } = await supabase
      .from("Sets")
      .select("*")
      .eq("exercise_id", exerciseId)
      .order("order", { ascending: true });

    if (error) {
      return [];
    }

    return data;
  }

  async update(item: Pick<ISet, "id"> & Partial<ISet>): Promise<ISet> {
    const { id, ...fields } = item;

    const { data, error } = await supabase
      .from("Sets")
      .update(fields)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }
}

export default new SetsService();
