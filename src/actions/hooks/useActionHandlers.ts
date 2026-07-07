import { useContext, useEffect, useRef } from "react";

import { ActionsContext } from "../ActionsContext";

type Options<T> = {
  onAction: (id: T) => void; // long press / RMB
  onClick?: (id: T) => void; // обычный клик
  delay?: number;
};

export function useActionHandlers<T = string>(options: Options<T>) {
  const timerRef = useRef<number | null>(null);
  const movedRef = useRef(false);
  const longPressRef = useRef(false);
  const fromTouchRef = useRef(false);

  const { activeId, setActiveId } = useContext(ActionsContext);

  const delay = options.delay ?? 450;

  const bind = (id: T) => ({
    // 🖱 ПКМ → меню
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault();

      if (fromTouchRef.current) {
        fromTouchRef.current = false;
        return;
      }

      longPressRef.current = true;

      options.onAction(id);
    },

    // 👆 обычный клик
    onClick: (e: React.MouseEvent) => {
      if (longPressRef.current || activeId === id) {
        longPressRef.current = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      options.onClick?.(id);
    },

    // 📱 touch start
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();

      movedRef.current = false;
      longPressRef.current = false;
      fromTouchRef.current = true;

      timerRef.current = window.setTimeout(() => {
        if (!movedRef.current) {
          longPressRef.current = true;

          options.onAction(id);
        }
      }, delay);
    },

    onTouchEnd: () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      fromTouchRef.current = true;
    },

    onTouchMove: () => {
      movedRef.current = true;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
  });

  useEffect(() => {
    return () => {
      setActiveId(null);
    };
  }, []);

  return { bind };
}
