import { MouseEventHandler } from "react";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

interface IAddButtonProps {
  title?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const SaveButton = ({
  title = "Сохранить запись",
  onClick,
}: IAddButtonProps) => {
  return (
    <div
      className="rounded-xl p-4 flex items-center justify-center text-lg text-white bg-gradient-to-br from-blue-500 to-blue-600 gap-2"
      onClick={onClick}
    >
      <SaveIcon />
      {title}
    </div>
  );
};

export default SaveButton;
