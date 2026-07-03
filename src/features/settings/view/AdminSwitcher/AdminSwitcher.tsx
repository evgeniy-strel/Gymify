import { useState } from "react";

import PasswordInput from "./PasswordInput";
import { useIsAdmin } from "../../../../auth/hooks/query";
import { useAuth, useLogout } from "../../../../auth/hooks/mutations";

import { Switch } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import clsx from "clsx";

const AdminSwitcher = () => {
  const { data: isAdmin, isLoading } = useIsAdmin();
  const authMutation = useAuth();
  const logoutMutation = useLogout();
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const onToggle = () => {
    if (isLoading) return;

    if (isAdmin) {
      logoutMutation.mutate();
    } else {
      setShowPasswordInput(true);
    }
  };

  const tryAuth = async (password: string) => {
    await authMutation.mutateAsync(password);
    setShowPasswordInput(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden p-5 cursor-pointer">
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
            <div className="text-gray-800 font-medium">
              Режим администратора
            </div>
            <div className="text-gray-400 text-sm">
              {isAdmin ? "Включен" : "Выключен"}
            </div>
          </div>

          <div className="ml-auto" onClick={onToggle}>
            <Switch
              checked={!!isAdmin}
              disabled={isLoading}
              readOnly
              sx={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </div>

      {showPasswordInput && (
        <PasswordInput
          onCancel={() => setShowPasswordInput(false)}
          onSubmit={tryAuth}
        />
      )}
    </>
  );
};

export default AdminSwitcher;
