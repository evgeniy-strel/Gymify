import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

export function useApiError() {
  const { enqueueSnackbar } = useSnackbar();

  function parse(error: AxiosError): string {
    const data = error?.response?.data;

    const message = data?.error || "Ошибка";
    const details = data?.details;

    if (details) {
      return `${message}\n${details}`;
    }

    return message;
  }

  function handleError(error: AxiosError) {
    enqueueSnackbar(parse(error), {
      variant: "error",
    });
  }

  return { handleError, parse };
}
