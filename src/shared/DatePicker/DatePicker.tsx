import { useState } from "react";

import { IAddItem } from "../../interface";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/ru";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IProps extends IAddItem {
  onChange: (value: Dayjs) => void;
}

export default function DatePickerValue({
  placeholder,
  options,
  onChange,
}: IProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          {...options}
          label={placeholder}
          defaultValue={dayjs(new Date())}
          onChange={onChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
