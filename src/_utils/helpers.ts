import api from "./axios";

export async function duplicateCall(callback: Function, count: number) {
  for (var i = 1; i <= count; i++) {
    await callback(i);
  }
}

export const isIOSPWA =
  window.matchMedia("(display-mode: standalone)").matches &&
  /iPhone|iPad|iPod/.test(navigator.userAgent);
