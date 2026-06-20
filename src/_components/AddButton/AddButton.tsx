import { MouseEventHandler, useMemo } from "react";

import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";

interface IAddButtonProps {
  title?: string;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AddButton = ({
  title = "Добавить запись",
  isLoading,
  onClick,
}: IAddButtonProps) => {
  const displayIcon = useMemo(() => {
    if (isLoading) {
      return <CircularProgress size={24} sx={{ color: "primary" }} />;
    }

    return <AddIcon />;
  }, [isLoading]);

  return (
    <div
      className="rounded-xl p-4 cursor-pointer hover:shadow-xl bg-white flex items-center justify-center text-lg gap-2"
      onClick={onClick}
    >
      {displayIcon}
      {title}
    </div>
  );
};

export default AddButton;
