import { useCallback, useState, SyntheticEvent, useMemo } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import { EPageRoutes } from "./consts";
import { default as BottomTabs, TABS } from "./BottomTabs";
import { Main } from "./pages/Main/Main";
import { Calendar } from "./pages/Calendar";
import { Progress } from "./pages/Progress";
import { Exercises } from "./pages/Exercises/Exercises";
import Approaches from "./pages/Approaches/Approaches";

const PageController = () => {
  const [url, setUrl] = useState(EPageRoutes.main);
  const navigate = useNavigate();

  const onChange = useCallback((event: SyntheticEvent, value: EPageRoutes) => {
    setUrl(value);
    const tab = TABS.find((tab) => tab.url === value);
    navigate(tab?.url);
  }, []);

  return (
    <div className="flex flex-col overflow-hidden h-dvh">
      <div className="h-full overflow-hidden">
        <Routes>
          <Route path={EPageRoutes.main} element={<Main />} />
          <Route path={EPageRoutes.calendar} element={<Calendar />} />
          <Route path={EPageRoutes.progress} element={<Progress />} />
          <Route
            path={EPageRoutes.exercises + "/:program"}
            element={<Exercises />}
          />
          <Route
            path={EPageRoutes.exercises + "/:program" + "/:exercise"}
            element={<Approaches />}
          />
        </Routes>
      </div>

      <div className="h-full flex-1">
        <BottomTabs activeKey={url} onChange={onChange} />
      </div>
    </div>
  );
};

export default PageController;
