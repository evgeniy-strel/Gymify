export const getDayId = (
  programId: string,
  week: number | string,
  day: number | string,
): string => `${programId}_${week}_${day}`;

export const getWeekId = (programId: string, week: number | string): string =>
  `${programId}_${week}`;
