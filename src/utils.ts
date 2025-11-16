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
} from "./_utils/loaders";
export type { IWeek, IDay, IProgram, IExercise } from "./_utils/loaders";
