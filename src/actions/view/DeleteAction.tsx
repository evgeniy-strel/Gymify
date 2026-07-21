import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";

import clsx from "clsx";

interface IDeleteActionsProps {
  disabled: boolean;
  onClick: Function;
}

const DeleteAction = ({ disabled, onClick }: IDeleteActionsProps) => {
  return (
    <div
      className={clsx({
        "pointer-events-auto": !disabled,
        "pointer-events-none": disabled,
      })}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
    >
      <DeleteIcon fontSize="large" sx={{ color: "white" }} />
      <div className="text-white text-sm">Удалить</div>
    </div>
  );
};

export default DeleteAction;
