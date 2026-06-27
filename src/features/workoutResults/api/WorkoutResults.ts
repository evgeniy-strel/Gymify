import { api } from "../../../utils";

import type { IDay } from "../../days/api/DaysService";
import type { IExercise } from "../..//exercises/api/ExercisesService";
import type { IProgram } from "../../programs/api/ProgramsService";

export interface IWorkoutResult {
  program: IProgram;
  days: IDay[];
  day: IDay;
  exercises: IExercise[];
  progress: {
    before: number;
    after: number;
  };
}

class WorkoutResultsService {
  async get(
    programId: string,
    weekNumber: string | number,
    dayNumber: string | number,
  ): Promise<IWorkoutResult | null> {
    try {
      const res = await api.get(
        `/workoutResults/${programId}/${weekNumber}/${dayNumber}`,
      );
      return res.data;
    } catch (error: any) {
      console.error("Failed to get workout results:", error);
      return null;
    }
  }
}

export default new WorkoutResultsService();
