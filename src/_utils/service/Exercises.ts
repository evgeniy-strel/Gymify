import { supabase } from "../supabase";

export interface IExercise {
  id: string;
  day_id: string;
  title: string;
  is_completed: boolean;
  sets_count: number;
  created_at: Date;
}

class ExercisesService {
  async create(item: Partial<IExercise>): Promise<any> {
    const { data, error } = await supabase
      .from("Exercises")
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error("Error creating exercise:", error);
      throw error;
    }

    return data;
  }

  async update(
    item: Pick<IExercise, "id"> & Partial<IExercise>
  ): Promise<IExercise> {
    const { id, ...fields } = item;

    const { data, error } = await supabase
      .from("Exercises")
      .update(fields)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }
}

export default new ExercisesService();
