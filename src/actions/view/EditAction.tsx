import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EditAction = ({ disabled, onClick }: { disabled: boolean; onClick: () => void }) => (
  <button
    type="button"
    disabled={disabled}
    className={disabled ? "pointer-events-none" : "pointer-events-auto cursor-pointer"}
    onClick={onClick}
  >
    <EditOutlinedIcon fontSize="large" sx={{ color: "white" }} />
    <div className="text-white text-sm">Редактировать</div>
  </button>
);

export default EditAction;
