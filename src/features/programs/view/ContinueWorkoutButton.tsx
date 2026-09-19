import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import type { MouseEvent, SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import ProgramsService from "../api/ProgramsService";
import { EPageRoutes } from "../../../navigation";

const stopPropagation = (event: SyntheticEvent) => event.stopPropagation();

const ContinueWorkoutButton = ({ programId }: { programId: string }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const continueWorkout = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const next = await ProgramsService.getNextWorkout(programId);
      if (!next) {
        enqueueSnackbar("Нет незавершённых недель", { variant: "info" });
        return;
      }

      const weekPath = `/${encodeURIComponent(programId)}${EPageRoutes.weeks}/${next.weekNumber}`;
      navigate(
        next.dayNumber === undefined
          ? weekPath
          : `${weekPath}${EPageRoutes.days}/${next.dayNumber}`,
      );
    } catch {
      enqueueSnackbar("Не удалось загрузить тренировку. Попробуйте ещё раз.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={continueWorkout}
      onTouchStart={stopPropagation}
      onTouchEnd={stopPropagation}
      onContextMenu={stopPropagation}
      className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600 transition-colors duration-150 hover:bg-blue-100 active:bg-blue-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 motion-reduce:transition-none"
    >
      {isLoading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <PlayArrowRoundedIcon fontSize="small" className="shrink-0" />
      )}
      <span>Продолжить программу</span>
    </button>
  );
};

export default ContinueWorkoutButton;
