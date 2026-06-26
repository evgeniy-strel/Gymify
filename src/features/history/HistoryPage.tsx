import { useHistoryQuery } from "./hooks/query";
import List from "./view/HistoryList";

import clsx from "clsx";

const Header = () => {
  return (
    <div
      className={clsx(
        "shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-1 z-10 shadow-sm",
      )}
    >
      <div className="flex items-center p-2">
        <div className="text-xl">Мои посещения</div>
      </div>
    </div>
  );
};

const History = () => {
  const { data: history } = useHistoryQuery();

  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="bg-white overflow-scroll">{<List items={history} />}</div>
    </div>
  );
};

export default History;
