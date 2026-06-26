export { ERoles, getIsAdmin, saveRoleToLocalStorage } from "./_utils/auth";
export { default as api } from "./_utils/axios";

export { default as TimersService } from "./_utils/service/Timers";
export type { ITimerData, ICheckData } from "./_utils/service/Timers";
export { default as WorkoutResultsService } from "./_utils/service/WorkoutResults";
export type { IWorkoutResult } from "./_utils/service/WorkoutResults";

export {
  duplicateCall,
  isIOSPWA,
  formatTime,
  formatTimeForDuration,
  formatDateNoYearSuffix,
  getExerciseWordForm,
} from "./_utils/helpers";
