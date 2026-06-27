import { useEffect, useState } from "react";

import WorkoutInfo from "./view/WorkoutInfo";
import Progress from "./view/Progress";
import StatsInfo from "./view/StatsInfo";
import type { IWorkoutResult } from "./api/WorkoutResults";

import { PrimaryButton } from "../../components";
import { EPageRoutes } from "../../navigation";

import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Confetti from "react-confetti";
import { useNavigate } from "react-router";

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 shadow-lg">
        <EmojiEventsOutlinedIcon color="primary" sx={{ fontSize: 68 }} />
      </div>
      <div className="text-white mb-1.5">Тренировка завершена</div>
      <div className="text-blue-100">Ты молодец, продолжай в том же духе!</div>
    </div>
  );
};

interface IProps {
  data: IWorkoutResult | null;
  onClose: Function;
}

const WorkoutResultsScreen = ({ onClose, data }: IProps) => {
  const [isConfettiRecycle, setIConfettiRecycle] = useState<boolean>(true);
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIConfettiRecycle(false);
    }, 600);
  }, []);

  const onCloseHandler = async () => {
    setIsClosing(true);
    await onClose();
    setIsClosing(false);
    navigate(EPageRoutes.main);
  };

  if (!data) {
    return <></>;
  }

  return (
    <div className="h-screen w-full top-0 left-0 z-20 absolute bg-gradient-to-b from-blue-600 to-blue-800">
      <div
        className="h-full w-full flex flex-col gap-4 items-center my-6 px-4"
        style={{
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="mb-2">
          <Header />
        </div>
        <WorkoutInfo data={data} />
        <Progress data={data} />
        <StatsInfo data={data} />
        <PrimaryButton
          caption="Вернуться на главную"
          color="light"
          icon={ArrowForwardIosIcon}
          iconProps={{ sx: { fontSize: 20 } }}
          readOnly={isClosing}
          isLoading={isClosing}
          onClick={onCloseHandler}
        />
        <Confetti
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 99,
          }}
          gravity={0.15}
          tweenDuration={1}
          recycle={isConfettiRecycle}
        />
      </div>
    </div>
  );
};

export default WorkoutResultsScreen;
