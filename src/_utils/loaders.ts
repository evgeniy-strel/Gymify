import { supabase } from "./supabase";

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

export interface IExercise {
  id: string;
  day_id: string;
  title: string;
  is_completed: boolean;
  sets_count: number;
  created_at: Date;
}

export interface IProgram {
  id: string;
  title: string;
  description: string;
  currentWeek: number;
  totalWeek: number;
  created_at: Date;
}

export interface IWeek {
  id: string;
  number: number;
  is_completed: boolean;
  program_id: string;
}

export interface IDay {
  id: string;
  number: number;
  is_completed: boolean;
  week_id: string;
  title: string;
  created_at: Date;
  exercises_count: number;
}

export async function getSets(exerciseId: string) {
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

export async function getPrograms(): IProgram[] {
  const { data, error } = await supabase.from("Programs").select("*");
  if (error) {
    return [];
  }

  return data;
}

export async function getProgram(id: string) {
  const { data, error } = await supabase
    .from("Programs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return [];
  }

  return data;
}

export async function getExercises(
  programId: string,
  week: number,
  day: number
) {
  const dayId = `${programId}_${week}_${day}`;

  const { data, error } = await supabase
    .from("Exercises")
    .select(
      `
      *,
      Sets(count)
    `
    )
    .eq("day_id", dayId)
    .order("created_at", { ascending: true });

  if (error) {
    return [];
  }

  // Преобразуем Sets(count) в sets_count
  return data.map((ex) => {
    const sets_count = ex.Sets?.[0]?.count ?? 0;
    const { Sets, ...rest } = ex;

    return {
      ...rest,
      sets_count,
    };
  });
}

export async function getExerciseById(exerciseId: string) {
  const { data, error } = await supabase
    .from("Exercises")
    .select("*")
    .eq("id", exerciseId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function getWeeks(programId: string): IWeek[] {
  const { data, error } = await supabase
    .from("Weeks")
    .select("*")
    .eq("program_id", programId)
    .order("number", { ascending: true });

  if (error) {
    return [];
  }

  return data;
}

export async function getDays(programId: string, week: number): IDay[] {
  const weekId = `${programId}_${week}`;

  const { data, error } = await supabase
    .from("Days")
    .select(
      `
      id,
      number,
      title,
      is_completed,
      week_id,
      created_at,
      Exercises(count)
    `
    )
    .eq("week_id", weekId)
    .order("number");

  if (error) {
    return [];
  }

  const result = data
    .map((day) => ({
      ...day,
      exercises_count: day.Exercises?.[0]?.count ?? 0,
    }))
    .map(({ Exercises, ...rest }) => rest);

  return result;
}
