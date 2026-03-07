import { SyntheticEvent } from "react";

import { EPageRoutes } from "./consts";
import { isIOSPWA } from "../utils";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import InsightsIcon from "@mui/icons-material/Insights";
import { Paper } from "@mui/material";

export const TABS = [
  {
    url: EPageRoutes.main,
    title: "Главная",
    icon: <HomeIcon />,
  },
  {
    url: EPageRoutes.history,
    title: "История",
    icon: <HistoryIcon />,
  },
  {
    url: EPageRoutes.progress,
    title: "Прогресс",
    icon: <InsightsIcon />,
  },
];

interface IProps {
  activeKey: EPageRoutes;
  onChange: (event: SyntheticEvent, value: EPageRoutes) => void;
}

export default function BottomTabs({
  activeKey = EPageRoutes.main,
  onChange,
}: IProps) {
  return (
    <Paper
      className=""
      elevation={3}
      sx={{
        paddingBottom: isIOSPWA ? "20px" : 0,
      }}
    >
      <Box>
        <BottomNavigation showLabels value={activeKey} onChange={onChange}>
          {TABS.map((tab) => (
            <BottomNavigationAction
              key={tab.url}
              value={tab.url}
              label={tab.title}
              icon={tab.icon}
            />
          ))}
        </BottomNavigation>
      </Box>
    </Paper>
  );
}
