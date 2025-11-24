import { MouseEventHandler } from "react";
import AddIcon from "@mui/icons-material/Add";

interface IAddButtonProps {
  title?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AddButton = ({ title = "Добавить запись", onClick }: IAddButtonProps) => {
  return (
    <div
      className="rounded-xl p-4 cursor-pointer hover:shadow-xl bg-white flex items-center justify-center text-lg gap-2"
      onClick={onClick}
    >
      <AddIcon />
      {title}
    </div>
  );
};

export default AddButton;
