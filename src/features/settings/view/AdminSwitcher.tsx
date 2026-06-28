import { useState, ChangeEvent } from "react";

import { ERoles, getIsAdmin, saveRoleToLocalStorage } from "../../../utils";

import { Switch } from "@mui/material";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import clsx from "clsx";

const AdminSwitcher = () => {
  const [isAdmin, setIsAdmin] = useState(getIsAdmin);

  const onChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
    const isAdmin = event.target.checked;
    setIsAdmin(isAdmin);
    saveRoleToLocalStorage(isAdmin ? ERoles.admin : ERoles.user);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden p-5">
      <div className="flex items-center gap-3">
        <div
          className={clsx("p-2 rounded-full", {
            "bg-blue-100": isAdmin,
            "bg-gray-100": !isAdmin,
          })}
        >
          <AdminPanelSettingsOutlinedIcon
            color={isAdmin ? "primary" : "action"}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-gray-800 font-medium">Режим администратора</div>
          <div className="text-gray-400 text-sm">
            {isAdmin ? "Включен" : "Выключен"}
          </div>
        </div>
        <div className="ml-auto">
          <Switch checked={isAdmin} onChange={onChangeRole} size="medium" />
        </div>
      </div>
    </div>
  );
};

export default AdminSwitcher;
