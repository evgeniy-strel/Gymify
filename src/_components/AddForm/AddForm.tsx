import { ChangeEvent, MouseEventHandler, useState } from "react";

import { NumberSpinner } from "../../baseUIComponents";
import SaveButton from "../SaveButton/SaveButton";

import { TextField } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";

import clsx from "clsx";

interface IHeaderProps {
  onClose: Function;
}

const Header = (props: IHeaderProps) => {
  return (
    <div
      className={clsx(
        "shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 px-2 pt-1 pb-2 z-10 shadow-sm"
      )}
    >
      <div className="flex items-center" onClick={props.onClose}>
        <div className="p-2">
          <ArrowBackIcon />
        </div>
        <div className="text-xl">Назад</div>
      </div>
    </div>
  );
};

type TTypeFields = "string" | "number";

interface IAddItem {
  name: string;
  type: TTypeFields;
  placeholder: string;
  options?: object;
}

interface IAddFormProps {
  fields: IAddItem[];
  onSave: Function;
  onClose: Function;
}

const AddForm = ({ fields, onSave, onClose }: IAddFormProps) => {
  const [fieldsValues, setFieldsValues] = useState({});
  const [duplicate, setDuplicate] = useState<number>(1);

  const onChangeTextField = (
    field: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFieldsValues((prev) => ({ ...prev, [field]: value }));
  };

  const onChangeNumber = (field: string, value: number) => {
    setFieldsValues((prev) => ({ ...prev, [field]: value }));
  };

  const onChangeDuplicate = (value: number) => {
    setDuplicate(value);
  };

  const saveHandler = () => {
    onSave(fieldsValues, duplicate);
  };

  return (
    <div className="bg-gray-100 h-dvh w-full flex flex-col absolute top-0 left-0 z-1000">
      <Header onClose={onClose} />
      <div className="p-4 flex flex-col gap-2">
        {fields.map((field) => {
          if (field.type === "string") {
            return (
              <TextField
                label={field.placeholder}
                variant="outlined"
                required
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
                {...field.options}
                onValueChange={(...args: any[]) =>
                  onChangeNumber(field.name, ...args)
                }
              />
            );
          }
        })}
        <div className="pb-1 pt-2">
          <Divider />
        </div>
        <NumberSpinner
          label="Продублировать раз"
          defaultValue={duplicate}
          onValueChange={onChangeDuplicate}
        />
        <div className="mt-1">
          <SaveButton onClick={saveHandler} />
        </div>
      </div>
    </div>
  );
};

export default AddForm;
