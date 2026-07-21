import React from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import clsx from "clsx";

interface IDeleteActionsProps {
  disabled: boolean;
  onClick: Function;
}

const DuplicateAction = ({ disabled, onClick }: IDeleteActionsProps) => {
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
      <ContentCopyIcon fontSize="large" sx={{ color: "white" }} />
      <div className="text-white text-sm">Дублировать</div>
    </div>
  );
};

export default DuplicateAction;
