import { MouseEventHandler } from "react";

import TaskAltIcon from "@mui/icons-material/TaskAlt";

interface IProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  caption?: string;
}

const CompleteButton = ({ onClick, caption = "Завершить" }: IProps) => {
  return (
    <div
      className="rounded-md w-full bg-blue-600 text-white h-14 flex items-center justify-center text-m"
      onClick={onClick}
    >
      <div className="flex justify-between gap-2">
        <div>{caption}</div>
        <TaskAltIcon />
      </div>
    </div>
  );
};

export default CompleteButton;
