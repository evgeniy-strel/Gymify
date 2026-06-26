import { useRef } from "react";

type Action<T> = {
  id: T;
  x: number;
  y: number;
};

type Options<T> = {
  onAction: (data: Action<T>) => void; // long press / RMB
  onClick?: (id: T) => void; // обычный клик
  delay?: number;
};

const OFFSET_FOR_MOBILE = 33;

export function useActionHandlers<T = string>(options: Options<T>) {
  const timerRef = useRef<number | null>(null);
  const movedRef = useRef(false);
  const longPressRef = useRef(false);

  const delay = options.delay ?? 500;

  const bind = (id: T) => ({
    // 🖱 ПКМ → меню
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault();

      longPressRef.current = true;

      options.onAction({
        id,
        x: e.clientX,
        y: e.clientY,
      });
    },

    // 👆 обычный клик
    onClick: (e: React.MouseEvent) => {
      if (longPressRef.current) {
        longPressRef.current = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      options.onClick?.(id);
    },

    // 📱 touch start
    onTouchStart: (e: React.TouchEvent) => {
      movedRef.current = false;
      longPressRef.current = false;

      const touch = e.touches[0];

      timerRef.current = window.setTimeout(() => {
        if (!movedRef.current) {
          longPressRef.current = true;

          options.onAction({
            id,
            x: touch.clientX - OFFSET_FOR_MOBILE,
            y: touch.clientY - OFFSET_FOR_MOBILE,
          });
        }
      }, delay);
    },

    onTouchEnd: () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },

    onTouchMove: () => {
      movedRef.current = true;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
  });

  return { bind };
}
