import { useState } from "react";

import PasswordInput from "./PasswordInput";
import {
  useAuth,
  useLogout,
  useIsAdmin,
  IAuthResult,
  EAvailableModifyActions,
} from "../../../../auth";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import ItemTemplate from "../ItemTemplate";
import { useModifyActions } from "../hooks/useModifyActions";

const AdminSwitcher = () => {
  const { data: isAdmin, isLoading } = useIsAdmin();
  const authMutation = useAuth();
  const logoutMutation = useLogout();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isPasswordSuccessfull, setIsPasswordSuccessfull] = useState<boolean>();

  const { availableModifyActions, toggleAction } = useModifyActions();

  const onToggle = () => {
    if (isLoading) return;

    if (isAdmin) {
      logoutMutation.mutate();
    } else {
      setShowPasswordInput(true);
    }
  };

  const tryAuth = async (password: string) => {
    authMutation.mutateAsync(password).then((result: IAuthResult) => {
      if (result.success) {
        setShowPasswordInput(false);
        setIsPasswordSuccessfull(true);
      } else {
        setIsPasswordSuccessfull(false);
      }
    });
  };

  const onCancel = () => {
    setShowPasswordInput(false);
    setIsPasswordSuccessfull(undefined);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden p-5 cursor-pointer">
        <ItemTemplate
          title="Режим администратора"
          description={isAdmin ? "Включен" : "Выключен"}
          icon={AdminPanelSettingsOutlinedIcon}
          isOn={!!isAdmin}
          onToggle={onToggle}
        />
        <div
          className={clsx("transition-opacity duration-300 mt-5", {
            "opacity-40 pointer-events-none": !isAdmin,
          })}
        >
          <div className="h-px bg-gray-100"></div>
          <div className="my-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Доступные действия
          </div>
          <div className="flex flex-col gap-5">
            <ItemTemplate
              title="Создание"
              description="Добавление новых записей"
              icon={AddCircleOutlineOutlinedIcon}
              isOn={availableModifyActions.includes(
                EAvailableModifyActions.CREATE,
              )}
              onToggle={() => toggleAction(EAvailableModifyActions.CREATE)}
            />
            <ItemTemplate
              title="Опции записей"
              description="Удаление и дублирование"
              icon={MenuIcon}
              isOn={availableModifyActions.includes(
                EAvailableModifyActions.DELETE,
              )}
              onToggle={() => toggleAction(EAvailableModifyActions.DELETE)}
            />
          </div>
        </div>
      </div>

      {showPasswordInput && (
        <PasswordInput
          isLoading={authMutation.isPending}
          error={
            isPasswordSuccessfull === false ? "Неверный пароль" : undefined
          }
          onCancel={onCancel}
          onSubmit={tryAuth}
        />
      )}
    </>
  );
};

export default AdminSwitcher;
