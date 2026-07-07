import { useState } from "react";
import { TextField } from "@mui/material";

import PrimaryButton from "../../../../shared/PrimaryButton/PrimaryButton";

interface IPasswordInputProps {
  isLoading?: boolean;
  error?: string;
  onCancel?: () => void;
  onSubmit?: (password: string) => void;
}

const PasswordInput = ({
  isLoading,
  error,
  onCancel,
  onSubmit,
}: IPasswordInputProps) => {
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="p-6">
          <div className="text-blue-600 text-lg font-semibold mb-1 text-center">
            Введите пароль
          </div>
          <div className="text-gray-400 text-sm text-center mb-5">
            Для включения режима администратора
          </div>
          <TextField
            className="w-full"
            label="Пароль"
            type="password"
            variant="outlined"
            value={password}
            error={!!error}
            helperText={error}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit?.(password);
              }
            }}
          />
          <div className="flex mt-4 gap-2 items-stretch">
            <PrimaryButton
              caption="Отмена"
              color="unaccented"
              onClick={onCancel}
            />
            <PrimaryButton
              isLoading={isLoading}
              caption="Войти"
              onClick={() => onSubmit?.(password)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
