import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { TextField } from "@mui/material";
import { formatTimeForDuration } from "../../../utils";

const MAX_WORKOUT_DURATION_IN_SEC = 4 * 60 * 60;

export interface WorkoutEndState {
  timestamp: number;
  durationSeconds: number;
  duration: string;
  error: string;
  isSuspiciouslyLong: boolean;
}

/* Валидация длительности тренировки */
export function getWorkoutEndState(
  startedAt: string | Date,
  endDate: string,
  endTime: string,
): WorkoutEndState {
  const startTimestamp = new Date(startedAt).getTime();
  const timestamp = new Date(`${endDate}T${endTime}`).getTime();
  const durationSeconds = Math.floor((timestamp - startTimestamp) / 1000);

  let error = "";
  if (!Number.isFinite(startTimestamp) || !Number.isFinite(timestamp)) {
    error = "Укажите корректные дату и время окончания.";
  } else if (timestamp < startTimestamp) {
    error = "Конец тренировки не может быть раньше ее начала.";
  } else if (timestamp > Date.now()) {
    error = "Конец тренировки не может быть в будущем.";
  }

  return {
    timestamp,
    durationSeconds,
    duration:
      Number.isFinite(durationSeconds) && durationSeconds >= 0
        ? formatTimeForDuration(durationSeconds)
        : "—",
    error,
    isSuspiciouslyLong: durationSeconds > MAX_WORKOUT_DURATION_IN_SEC,
  };
}

const fieldStyles = {
  width: "100%",
  minWidth: 0,
  "& .MuiOutlinedInput-root": {
    minWidth: 0,
    borderRadius: "14px",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#d1d5db" },
    "&.Mui-focused fieldset": { borderColor: "#2563eb", borderWidth: 1 },
  },
  "& .MuiInputBase-input": {
    minWidth: 0,
    fontSize: 15,
  },
  "& input[type='date'], & input[type='time']": {
    WebkitAppearance: "none",
    appearance: "none",
    flex: "1 1 0",
    width: 0,
    minWidth: 0,
    padding: "16.5px 14px",
    lineHeight: "1.4375em",
  },
  "& input::-webkit-date-and-time-value": {
    minWidth: 0,
    textAlign: "left",
  },
  "& .MuiInputLabel-root": { fontSize: 14 },
};

interface WorkoutEndTimeEditorProps {
  endDate: string;
  endTime: string;
  state: WorkoutEndState;
  requestError: string;
  disabled: boolean;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}

const WorkoutEndTimeEditor = ({
  endDate,
  endTime,
  state,
  requestError,
  disabled,
  onDateChange,
  onTimeChange,
}: WorkoutEndTimeEditorProps) => {
  const error = state.error || requestError;

  return (
    <>
      <div className="mt-3">
        <div className="mb-3 text-sm text-gray-500">Конец тренировки</div>
        <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-2">
          <TextField
            fullWidth
            label="Дата"
            type="date"
            value={endDate}
            disabled={disabled}
            onChange={(event) => onDateChange(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            error={Boolean(error)}
            sx={fieldStyles}
          />
          <TextField
            fullWidth
            label="Время"
            type="time"
            value={endTime}
            disabled={disabled}
            onChange={(event) => onTimeChange(event.target.value)}
            slotProps={{ inputLabel: { shrink: true }, htmlInput: { step: 60 } }}
            error={Boolean(error)}
            sx={fieldStyles}
          />
        </div>
        {error && <p className="mt-2 text-xs leading-relaxed text-red-600">{error}</p>}
      </div>

      <div
        className={`mt-2 rounded-lg px-3 py-2 text-sm ${
          state.isSuspiciouslyLong ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
        }`}
      >
        <div className="flex items-center">
          <HourglassBottomIcon className="mr-2" sx={{ fontSize: 16 }} />
          <span>Длительность:&nbsp;</span>
          <span>{state.duration}</span>
        </div>
        {state.isSuspiciouslyLong && (
          <div className="mt-1 pl-6 text-xs font-medium">Подозрительно длинная тренировка</div>
        )}
      </div>
    </>
  );
};

export default WorkoutEndTimeEditor;
