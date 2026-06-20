import { useEffect, useRef } from "react";

/* Хук отслеживает пробуждение вкладки
   Полезен, например при разблокировке телефона, чтобы подгрузить актуальные данные */
export function useAppResume(onActive: () => void) {
  const lastCallRef = useRef(0);

  const safeCall = () => {
    const now = Date.now();
    if (now - lastCallRef.current < 500) return; // защита от дублей
    lastCallRef.current = now;
    onActive();
  };

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        safeCall();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", safeCall);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", safeCall);
    };
  }, [onActive]);
}
