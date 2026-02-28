import { ChangeEvent, MouseEventHandler, useState } from "react";

import { NumberSpinner } from "../../baseComponents";
import SaveButton from "../SaveButton/SaveButton";

import { LinearProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import Divider from "@mui/material/Divider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import clsx from "clsx";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { IAddItem } from "./interface";
import DatePickerValue from "./DatePicker";
import { Dayjs, default as dayjs } from "dayjs";

interface IHeaderProps {
  onClose: Function;
  description?: string;
}

const Header = (props: IHeaderProps) => {
  return (
    <div
      className={clsx(
        "shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pt-1 pb-2 z-10 shadow-sm",
      )}
    >
      <div className="flex items-center" onClick={props.onClose}>
        <div className="p-2">
          <ArrowBackIcon />
        </div>
        <div className="text-xl">Добавление данных</div>
      </div>
      {props.description && (
        <div className="text-sm px-2 text-gray-600">{props.description}</div>
      )}
    </div>
  );
};

interface IAddFormProps {
  fields: IAddItem[];
  duplicateButton?: boolean;
  description?: string;
  onSave: Function;
  onClose: Function;
}

const AddForm = ({
  fields,
  onSave,
  onClose,
  duplicateButton,
  description,
}: IAddFormProps) => {
  const [fieldsValues, setFieldsValues] = useState(
    fields.reduce((result, field) => {
      if (field.type === "date") {
        result[field.name] = dayjs(new Date());
      }
      return result;
    }, {}),
  );
  const [duplicate, setDuplicate] = useState<number>(1);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const onChangeTextField = (
    field: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (isSaving) {
      return;
    }

    const value = event.target.value;
    setFieldsValues((prev) => ({ ...prev, [field]: value }));
  };

  const onChangeNumber = (field: string, value: number) => {
    if (isSaving) {
      return;
    }

    setFieldsValues((prev) => ({ ...prev, [field]: value }));
  };

  const onChangeDate = (field: string, value: Dayjs) => {
    if (isSaving) {
      return;
    }

    setFieldsValues((prev) => ({ ...prev, [field]: value }));
  };

  const onChangeDuplicate = (value: number) => {
    if (isSaving) {
      return;
    }

    setDuplicate(value);
  };

  const saveHandler = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    await onSave(fieldsValues, duplicate);
    setIsSaving(false);
  };

  return (
    <div className="bg-gray-100 h-dvh w-full flex flex-col absolute top-0 left-0 z-1000">
      <Header description={description} onClose={onClose} />
      {isSaving && <LinearProgress />}
      <div className="p-4 flex flex-col gap-2">
        {fields.map((field) => {
          if (field.type === "string") {
            return (
              <TextField
                label={field.placeholder}
                variant="outlined"
                required
                disabled={isSaving}
                onChange={(...args: any[]) =>
                  onChangeTextField(field.name, ...args)
                }
              />
            );
          }
          if (field.type === "number") {
            return (
              <NumberSpinner
                label={field.placeholder}
                disabled={isSaving}
                {...field.options}
                onValueChange={(...args: any[]) =>
                  onChangeNumber(field.name, ...args)
                }
              />
            );
          }
          if (field.type === "date") {
            return (
              <DatePickerValue
                {...field}
                onChange={(...args: any[]) => onChangeDate(field.name, ...args)}
              />
            );
          }
        })}
        {duplicateButton && (
          <>
            <div className="pb-1 pt-2">
              <Divider />
            </div>
            <NumberSpinner
              label="Продублировать раз"
              defaultValue={duplicate}
              disabled={isSaving}
              onValueChange={onChangeDuplicate}
            />
          </>
        )}
        <div className="mt-1 flex flex-col gap-2">
          <PrimaryButton
            caption="Сохранить запись"
            icon={SaveIcon}
            iconPosition="beforeText"
            readOnly={isSaving}
            onClick={saveHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default AddForm;
