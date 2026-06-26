import { useState, ChangeEvent } from "react";

import { ERoles, getIsAdmin, saveRoleToLocalStorage } from "../../utils";

import { Switch } from "@mui/material";

const Auth = () => {
  const [isAdmin, setIsAdmin] = useState(getIsAdmin);

  const onChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
    const isAdmin = event.target.checked;
    setIsAdmin(isAdmin);
    saveRoleToLocalStorage(isAdmin ? ERoles.admin : ERoles.user);
  };

  return (
    <div className="p-2">
      <div className="flex items-center gap-1">
        <div>Админ</div>
        <Switch checked={isAdmin} onChange={onChangeRole} />
      </div>
    </div>
  );
};

export default Auth;
