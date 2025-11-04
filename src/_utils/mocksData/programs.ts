const PROGRAMS_TRAINING: any[] = [
  {
    id: "legs",
    title: "Ноги",
    description: "Тренировка ног и плеч",
    colors: ["blue", "cyan"],
    className: "from-blue-100 to-cyan-100",
    iconUrl: "./icons/legs-2.svg",
    mainGradient: "from-blue-500 to-cyan-500",
    currentWeek: 7,
    countWeek: 16,
  },
  {
    id: "back",
    title: "Спина",
    description: "Тренировка спины и бицепса",
    colors: ["emerald", "teal"],
    className: "from-emerald-100 to-teal-100",
    iconUrl: "./icons/back.svg",
    mainGradient: "from-emerald-500 to-teal-500",
    currentWeek: 7,
    countWeek: 16,
  },
  {
    id: "chest",
    title: "Грудь",
    description: "Тренировка груди и трицепса",
    colors: ["pink", "red"],
    className: "from-pink-100 to-red-100",
    iconUrl: "./icons/chest.svg",
    mainGradient: "from-pink-500 to-red-500",
    currentWeek: 6,
    countWeek: 16,
  },
];

export const getPrograms = async () => {
  return PROGRAMS_TRAINING;
};

export const getProgram = async ({ id }: any) => {
  return PROGRAMS_TRAINING.find((program) => program.id === id);
};
