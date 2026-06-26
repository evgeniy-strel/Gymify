export function getDuration(startDate: string, endDate: string): number {
  return (new Date(endDate) - new Date(startDate)) / 1000;
}
