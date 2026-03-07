import { useCallback, useState, SyntheticEvent, useMemo } from "react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { EPageRoutes } from "./consts";
import { default as BottomTabs, TABS } from "./BottomTabs";
import { Main } from "./pages/Main/Main";
import { History } from "./pages/History/History";
import { Progress } from "./pages/Progress/Progress";
import { Exercises } from "./pages/Exercises/Exercises";
import Approaches from "./pages/Approaches/Approaches";
import Auth from "./pages/Auth/Auth";
import Weeks from "./pages/Weeks/Weeks";
import Days from "./pages/Days/Days";

/* Компонент, отвечающий за упраление роутингом и раскладку страницы  */
const PageController = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState(location.pathname);
  const activeKeyTab = useMemo(
    () => (Object.values(EPageRoutes).includes(url) ? url : EPageRoutes.main),
    [url],
  );

  const onChange = useCallback((event: SyntheticEvent, value: EPageRoutes) => {
    setUrl(value);
    const tab = TABS.find((tab) => tab.url === value);
    navigate(tab?.url);
  }, []);

  return (
    <div className="flex flex-col overflow-hidden h-screen w-dvw absolute top-0 left-0 Gymify-safe-area-inset-top">
      <div className="h-full overflow-hidden">
        <Routes>
          <Route path={EPageRoutes.main} element={<Main />} />
          <Route path={EPageRoutes.history} element={<History />} />
          <Route path={EPageRoutes.progress} element={<Progress />} />
          <Route path={EPageRoutes.auth} element={<Auth />} />
          <Route path={"/:programId" + EPageRoutes.weeks} element={<Weeks />} />
          <Route
            path={"/:programId" + EPageRoutes.weeks + "/:weekNumber"}
            element={<Days />}
          />
          <Route
            path={
              "/:programId" +
              EPageRoutes.weeks +
              "/:weekNumber" +
              EPageRoutes.days +
              "/:dayNumber"
            }
            element={<Exercises />}
          />
          <Route
            path={
              "/:programId" +
              EPageRoutes.weeks +
              "/:weekNumber" +
              EPageRoutes.days +
              "/:dayNumber" +
              "/:exerciseId"
            }
            element={<Approaches />}
          />
        </Routes>
      </div>
      <div className="h-full flex-1 z-2">
        <BottomTabs activeKey={activeKeyTab} onChange={onChange} />
      </div>
    </div>
  );
};

export default PageController;
