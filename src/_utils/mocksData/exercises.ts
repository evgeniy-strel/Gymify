export interface IApproache {
  weight: number;
  count: number;
  isCompleted: boolean;
}

export interface IExercise {
  title: string;
  approaches: IApproache[];
  isCompleted: boolean;
}

const APPROACHES: IApproache[] = [
  { weight: 70, count: 4, isCompleted: false },
  { weight: 70, count: 4, isCompleted: false },
  { weight: 80, count: 3, isCompleted: false },
  { weight: 85, count: 2, isCompleted: false },
];

const CHEST_DATA_FOR_ONE_DAY: IExercise[] = [
  {
    title: "Жим лежа",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Жим на наклонной скамье",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Разводка с гантелями",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Отжимания на брусьях",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Французский жим",
    approaches: APPROACHES,
    isCompleted: false,
  },
];

const LEGS_DATA_FOR_ONE_DAY: IExercise[] = [
  {
    title: "Приседания со штангой",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Жим ногами",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Сгибания ног",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Разгибания ног",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Подъем на носки",
    approaches: APPROACHES,
    isCompleted: false,
  },
];

const BACK_DATA_FOR_ONE_DAY: IExercise[] = [
  {
    title: "Становая тяга",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Подтягивания",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Тяга штанги в наклоне",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Тяга верхнего блока",
    approaches: APPROACHES,
    isCompleted: false,
  },
  {
    title: "Молотки на бицепс",
    approaches: APPROACHES,
    isCompleted: false,
  },
];

export const getExercises = async ({ program }: any): Promise<IExercise[]> => {
  switch (program) {
    case "legs":
      return CHEST_DATA_FOR_ONE_DAY;
    case "back":
      return LEGS_DATA_FOR_ONE_DAY;
    case "chest":
      return BACK_DATA_FOR_ONE_DAY;
  }

  return [];
};

export const getExercise = async ({
  program,
  title,
}: any): Promise<IExercise | undefined> => {
  const exercises = await getExercises({ program });
  return exercises?.find((item) => item.title === title);
};
