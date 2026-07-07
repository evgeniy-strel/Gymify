import { createContext, useState } from "react";

/* Провайдер для работы опций в списках. Хранит на стейте запись, у которой активна опция
   Необходимо, чтобы одновременно показывать в списках только одну запись с опциями */
export const ActionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <ActionsContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ActionsContext.Provider>
  );
};

export const ActionsContext = createContext<{
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
}>({});
