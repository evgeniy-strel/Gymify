export { ERoles, getIsAdmin, saveRoleToLocalStorage } from "./_utils/auth";

export { default as SetsService } from "./_utils/service/Sets";
export type { ISet } from "./_utils/service/Sets";
export { default as ExercisesService } from "./_utils/service/Exercises";
export type { IExercise } from "./_utils/service/Exercises";
export { default as ProgramsService } from "./_utils/service/Programs";
export type { IProgram } from "./_utils/service/Programs";
export { default as WeeksService } from "./_utils/service/Weeks";
export type { IWeek } from "./_utils/service/Weeks";
export { default as DaysService } from "./_utils/service/Days";
export type { IDay } from "./_utils/service/Days";

export { duplicateCall } from "./_utils/helpers";
