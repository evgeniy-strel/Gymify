import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import AdminSwitcher from "./view/AdminSwitcher";

const Header = () => {
  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate(-1);
  };

  return (
    <div className="shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pb-1 z-10 shadow-sm">
      <div className="flex items-center">
        <div className="p-2" onClick={redirectToMain}>
          <ArrowBackIcon />
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-xl">Назад</div>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="bg-gray-100 py-3 px-2 h-full">
        <AdminSwitcher />
        {/* <div>Админ</div> */}
        {/* <Switch checked={isAdmin} onChange={onChangeRole} /> */}
      </div>
    </div>
  );
};

export default SettingsPage;
