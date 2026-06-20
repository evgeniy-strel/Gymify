import api from "./axios";

export async function duplicateCall(callback: Function, count: number) {
  for (var i = 1; i <= count; i++) {
    await callback(i);
  }
}

export const isIOSPWA =
  window.matchMedia("(display-mode: standalone)").matches &&
  /iPhone|iPad|iPod/.test(navigator.userAgent);

/* Возвращает строковой вид времени, при отсутствии часов отбрасывает их
   Например 1:16:35 или 12:20, 1:37 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const min = Math.floor(seconds / 60) - hours * 60;
  const sec = seconds % 60;

  const minFormatted = String(hours && min < 10 ? `0${min}` : min);
  const secFormatted = String(sec < 10 ? `0${sec}` : sec);

  return `${hours === 0 ? "" : hours + ":"}${minFormatted}:${secFormatted}`;
};

export const formatTimeForDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const min = Math.floor(seconds / 60) - hours * 60;

  return `${hours ? hours + "ч" : ""} ${min ? min + "м" : ""}`.trim();
};

export function formatDateNoYearSuffix(date: string | Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(new Date(date))
    .replace("г.", "")
    .trim();
}

export function getExerciseWordForm(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (
    (10 <= lastTwoDigits && lastTwoDigits <= 20) ||
    (5 <= lastDigit && lastDigit <= 9) ||
    lastDigit === 0
  ) {
    return `${count} упражнений`;
  }

  if (2 <= lastDigit && lastDigit <= 4) {
    return `${count} упражнения`;
  }

  return `${count} упражнение`;
}
