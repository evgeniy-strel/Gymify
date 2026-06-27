import { FunctionComponent, useState } from "react";

import { useActionHandlers } from "./useActionHandlers";

import DeleteIcon from "@mui/icons-material/Delete";
import clsx from "clsx";
import DeleteDialog from "./DeleteDialog";

interface IActionProps {
  itemKey: string;
  showActions: boolean;
  onActionClick: (id: string) => void;
  onClick?: (id: string) => void;
}

type TItemProps = Record<string, unknown>;

const ConnectToActions = <T extends object>(Item: FunctionComponent<T>) => {
  return function Wrapped(props: IActionProps & T) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { onActionClick, onClick, showActions, ...itemProps } = props;

    const { bind } = useActionHandlers<string>({
      onAction: onActionClick,
      onClick,
    });

    return (
      <div className="relative">
        {/* ITEM */}
        <div
          {...bind(props.itemKey)}
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
              showActions ? "opacity-100 scale-100" : "opacity-0 scale-100",
            )}
          >
            <div>
              <DeleteIcon
                onClick={() => setShowDeleteDialog(true)}
                fontSize="large"
                sx={{ color: "white" }}
              />
              <div className="text-white text-sm">Удалить</div>
            </div>
          </div>

          {/* DIALOG */}
          {showDeleteDialog && (
            <DeleteDialog onClose={() => setShowDeleteDialog(false)} />
          )}
        </div>
      </div>
    );
  };
};

export default ConnectToActions;
