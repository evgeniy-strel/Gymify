import { FunctionComponent, useContext, useEffect, useState } from "react";

import { ActionsContext } from "./ActionsContext";
import { useActionHandlers } from "./useActionHandlers";

import DeleteIcon from "@mui/icons-material/Delete";
import clsx from "clsx";
import DeleteDialog from "./DeleteDialog";

export type TActions = "delete";

interface IActionProps {
  itemKey?: string;
  onActionComplete?: (actionId: TActions, itemKey: string) => void;
  onClick?: (id: string) => void;
}

const ConnectToActions = <T extends object>(Item: FunctionComponent<T>) => {
  return function Wrapped(props: IActionProps & T) {
    const { onActionComplete, onClick, ...itemProps } = props;

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [actionsClickable, setActionsClickable] = useState<boolean>(false);

    const { activeId, setActiveId } = useContext(ActionsContext);
    const itemKey = (props.itemKey || props?.item?.id) as string;
    const showActions = activeId === itemKey;

    const onAction = () => {
      setActiveId((prev) => (prev === itemKey ? "" : itemKey));
    };

    const { bind } = useActionHandlers<string>({
      onAction,
      onClick,
    });

    useEffect(() => {
      if (showActions) {
        setTimeout(() => setActionsClickable(true), 300);
      } else {
        setActionsClickable(false);
      }
    }, [showActions]);

    return (
      <div className="relative">
        {/* ITEM */}
        <div
          {...bind(itemKey)}
          className="select-none transition-all duration-200 ease-out select-none hover:brightness-95 hover:scale-[0.99] active:brightness-95 active:scale-[0.98]"
        >
          <Item {...itemProps} />
        </div>

        {/* OVERLAY */}
        <div
          // onClick={showActions ? onClick : undefined}
          className={clsx(
            "absolute inset-0 z-10 rounded-xl pointer-events-none transition-all duration-200 ease-out",
          )}
        >
          {/* 🌫 BLUR LAYER */}
          <div
            className={clsx(
              "absolute inset-[1px] rounded-xl backdrop-blur-sm bg-black/20",
              "transition-all duration-200 ease-out",
              showActions ? "opacity-100" : "opacity-0",
            )}
          />

          {/* 🗑 ICON LAYER */}
          <div
            className={clsx(
              "select-none absolute inset-0 flex items-center justify-center text-center",
              "transition-all duration-200 ease-out",
              showActions
                ? "opacity-100 scale-100"
                : "opacity-0 scale-100 invisible",
            )}
          >
            <div
              className={clsx({
                "pointer-events-auto": actionsClickable,
                "pointer-events-none": !actionsClickable,
              })}
              onClick={() => {
                if (!actionsClickable) return;
                setShowDeleteDialog(true);
              }}
            >
              <DeleteIcon fontSize="large" sx={{ color: "white" }} />
              <div className="text-white text-sm">Удалить</div>
            </div>
          </div>

          {/* DIALOG */}
          {showDeleteDialog && (
            <DeleteDialog
              onClose={() => setShowDeleteDialog(false)}
              itemName={props.item?.title}
              onDelete={() => onActionComplete?.("delete", itemKey)}
            />
          )}
        </div>
      </div>
    );
  };
};

export default ConnectToActions;
