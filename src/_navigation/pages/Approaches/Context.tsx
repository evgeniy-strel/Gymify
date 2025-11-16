import { createContext, Dispatch, SetStateAction } from "react";

import type { IExercise, IProgram } from "../../../utils";

interface IApproachesContext {
  exercise: IExercise;
  setExercise: Dispatch<SetStateAction<IExercise | undefined>>;
  program: IProgram;
  setProgram: Dispatch<SetStateAction<IProgram | undefined>>;
}

export const ApproachesContext = createContext<IApproachesContext>(null);
