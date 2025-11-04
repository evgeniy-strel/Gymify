const CHEST_DATA = [
  {
    title: "Жим лежа",
    approaches: 4,
  },
  {
    title: "Жим на наклонной скамье",
    approaches: 4,
  },
  {
    title: "Разводка с гантелями",
    approaches: 3,
  },
  {
    title: "Отжимания на брусьях",
    approaches: 3,
  },
  {
    title: "Французский жим",
    approaches: 3,
  },
];

const LEGS_DATA = [
  {
    title: "Приседания со штангой",
    approaches: 4,
  },
  {
    title: "Жим ногами",
    approaches: 4,
  },
  {
    title: "Сгибания ног",
    approaches: 3,
  },
  {
    title: "Разгибания ног",
    approaches: 3,
  },
  {
    title: "Подъем на носки",
    approaches: 3,
  },
];

const BACK_DATA = [
  {
    title: "Становая тяга",
    approaches: 4,
  },
  {
    title: "Подтягивания",
    approaches: 4,
  },
  {
    title: "Тяга штанги в наклоне",
    approaches: 4,
  },
  {
    title: "Тяга верхнего блока",
    approaches: 3,
  },
  {
    title: "Молотки на бицепс",
    approaches: 3,
  },
];

export const getExercises = async ({ program, week }: any) => {
  switch (program) {
    case "legs":
      return LEGS_DATA;
    case "back":
      return BACK_DATA;
    case "chest":
      return CHEST_DATA;
  }
};
