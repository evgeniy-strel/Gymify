import { useState } from "react";

import {
  getAvailableModifyActions,
  saveAvailableModifyAction,
  removeAvailableModifyAction,
} from "../../../../auth/utils/helpers";
import { EAvailableModifyActions } from "../../../../auth/utils/consts";

export function useModifyActions() {
  const [availableModifyActions, setAvailableModifyActions] = useState(
    getAvailableModifyActions,
  );

  const addAction = (action: EAvailableModifyActions) => {
    saveAvailableModifyAction(action);
    setAvailableModifyActions(getAvailableModifyActions);
  };

  const removeAction = (action: EAvailableModifyActions) => {
    removeAvailableModifyAction(action);
    setAvailableModifyActions(getAvailableModifyActions);
  };

  const toggleAction = (action: EAvailableModifyActions) => {
    if (availableModifyActions.includes(action)) {
      removeAction(action);
    } else {
      addAction(action);
    }
  };

  return { availableModifyActions, addAction, removeAction, toggleAction };
}
