import { FunctionComponent, useContext, useEffect, useState } from "react";

import { ActionsContext } from "./ActionsContext";
import { useActionHandlers } from "./hooks/useActionHandlers";
import DeleteDialog from "./view/DeleteDialog";
import { useCanDelete } from "../auth";

import DeleteIcon from "@mui/icons-material/Delete";
import clsx from "clsx";
import DeleteAction from "./view/DeleteAction";
import DuplicateAction from "./view/DuplicateAction";

export type TActions = "delete" | "duplicate";

interface IActionProps {
  actions: TActions[];
  itemKey?: string;
  /* В случае возвращения промиса будет показан индикатор до его завершения */
  onActionComplete?: (
    actionId: TActions,
    itemKey: string,
  ) => void | Promise<void>;
  onClick?: (id: string) => void;
}

const ConnectToActions = <T extends object>(Item: FunctionComponent<T>) => {
  return function Wrapped(props: IActionProps & T) {
    const { onActionComplete, onClick, actions, ...itemProps } = props;

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [actionsClickable, setActionsClickable] = useState<boolean>(false);
    const [isActionInProgress, setIsActionInProgress] = useState<boolean>();

    const { activeId, setActiveId } = useContext(ActionsContext);
    const itemKey = (props.itemKey || props?.item?.id) as string;
    const canDelete = useCanDelete();
    const showActions = activeId === itemKey;

    const onAction = () => {
      setActiveId((prev) => (prev === itemKey ? "" : itemKey));
    };

    const { bind } = useActionHandlers<string>({
      onAction,
      onClick,
    });

    const onDelete = async () => {
      try {
        setIsActionInProgress(true);
        await onActionComplete?.("delete", itemKey);
      } finally {
        setIsActionInProgress(false);
      }
    };

    const onDuplicate = async () => {
      try {
        setIsActionInProgress(true);
        await onActionComplete?.("duplicate", itemKey);
      } finally {
        setIsActionInProgress(false);
      }
    };

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
              "select-none absolute inset-0 flex items-center text-center transition-all duration-200 ease-out",
              showActions
                ? "opacity-100 scale-100"
                : "opacity-0 scale-100 invisible",
              { "justify-center": false, "justify-around": true },
            )}
          >
            {actions.includes("delete") && canDelete && (
              <DeleteAction
                disabled={!actionsClickable}
                onClick={() => setShowDeleteDialog(true)}
              />
            )}
            {actions.includes("duplicate") && (
              <DuplicateAction
                disabled={!actionsClickable}
                onClick={onDuplicate}
              />
            )}
          </div>

          {/* DIALOG */}
          {showDeleteDialog && (
            <DeleteDialog
              onClose={() => setShowDeleteDialog(false)}
              itemName={props.item?.title}
              isLoading={isActionInProgress}
              onDelete={onDelete}
            />
          )}
        </div>
      </div>
    );
  };
};

export default ConnectToActions;
