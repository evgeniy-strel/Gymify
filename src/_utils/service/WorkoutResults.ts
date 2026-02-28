import api from "../axios";
import type { IDay } from "./Days";
import type { IExercise } from "./Exercises";
import type { IProgram } from "./Programs";

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
    weekNumber: string,
    dayNumber: string,
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
