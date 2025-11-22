export { getExercise } from "./_utils/mocksData/exercises";
export type { IApproache } from "./_utils/mocksData/exercises";
export { supabase } from "./_utils/supabase";
export { ERoles, getIsAdmin, saveRoleToLocalStorage } from "./_utils/auth";
export {
  getPrograms,
  getWeeks,
  getDays,
  getProgram,
  getExercises,
  getExerciseById,
  getSets,
} from "./_utils/loaders";
export { default as SetsService } from "./_utils/service/Sets";
export { default as ExercisesService } from "./_utils/service/Exercises";
export type { IWeek, IDay, IProgram, IExercise, ISet } from "./_utils/loaders";
