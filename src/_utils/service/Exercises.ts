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
