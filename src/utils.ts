export { default as api } from "./_utils/axios";
export { useApiError } from "./_utils/hooks/useApiError";

export { default as TimersService } from "./_utils/service/Timers";
export type { ITimerData, ICheckData } from "./_utils/service/Timers";

export {
  duplicateCall,
  isIOSPWA,
  formatTime,
  formatTimeForDuration,
  formatDateNoYearSuffix,
  getExerciseWordForm,
} from "./_utils/helpers";
