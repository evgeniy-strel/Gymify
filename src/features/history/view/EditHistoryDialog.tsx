import { useState } from "react";

import { useUpdateHistoryEndTime } from "../hooks/mutations";
import type { IHistoryItem } from "../api/HistoryService";
import WorkoutEndTimeEditor, {
  getWorkoutEndState,
} from "./WorkoutEndTimeEditor";
import PrimaryButton from "../../../shared/PrimaryButton/PrimaryButton";

import { Dialog } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const dialogSlotProps = {
  paper: {
    sx: {
      borderRadius: "24px",
      m: 2,
      width: "calc(100% - 32px)",
      backgroundColor: "#fff",
      boxShadow: "0 24px 80px rgb(0 0 0 / 14%)",
    },
  },
  backdrop: {
    sx: {
      backgroundColor: "rgb(15 23 42 / 25%)",
      backdropFilter: "blur(4px)",
    },
  },
};

const DateDisplay = ({ date }: { date: string }) => {
  return (
    <div className="mt-1 text-base tabular-nums rounded-2xl bg-gray-50 px-4 py-3 border-1 border-gray-200">
      {date}
    </div>
  );
};

const EditHistoryDialog = ({
  item,
  onClose,
}: {
  item: IHistoryItem;
  onClose: () => void;
}) => {
  const initialEnd = dayjs(item.completed_at);
  const [endDate, setEndDate] = useState(() => initialEnd.format("YYYY-MM-DD"));
  const [endTime, setEndTime] = useState(() => initialEnd.format("HH:mm"));
  const [requestError, setRequestError] = useState("");
  const mutation = useUpdateHistoryEndTime();

  const endState = getWorkoutEndState(item.started_at, endDate, endTime);

  const changeEndDate = (value: string) => {
    setEndDate(value);
    setRequestError("");
  };

  const changeEndTime = (value: string) => {
    setEndTime(value);
    setRequestError("");
  };

  const save = async () => {
    if (mutation.isPending || endState.error) return;

    try {
      await mutation.mutateAsync({
        id: item.id,
        completed_at: new Date(endState.timestamp).toISOString(),
      });
      onClose();
    } catch (error) {
      setRequestError(error.message || "Не удалось сохранить время окончания");
    }
  };

  return (
    <Dialog
      open
      onClose={() => !mutation.isPending && onClose()}
      fullWidth
      maxWidth="xs"
      slotProps={dialogSlotProps}
    >
      <div className="p-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            Редактировать тренировку
          </h2>
        </div>

        <div className="mt-5">
          <div className="text-sm text-gray-500">Начало тренировки</div>
          <div className="grid grid-cols-[3fr_2fr] gap-2">
            <DateDisplay date={dayjs(item.started_at).format("DD.MM.YYYY")} />
            <DateDisplay date={dayjs(item.started_at).format("HH:MM")} />
          </div>
        </div>

        <WorkoutEndTimeEditor
          endDate={endDate}
          endTime={endTime}
          state={endState}
          requestError={requestError}
          disabled={mutation.isPending}
          onDateChange={changeEndDate}
          onTimeChange={changeEndTime}
        />

        <div className="mt-4 flex gap-3">
          <PrimaryButton
            caption="Отмена"
            color="unaccented"
            size="small"
            readOnly={mutation.isPending}
            onClick={onClose}
          />
          <PrimaryButton
            caption="Сохранить"
            readOnly={mutation.isPending || Boolean(endState.error)}
            size="small"
            isLoading={mutation.isPending}
            onClick={save}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default EditHistoryDialog;
