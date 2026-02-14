import { useCallback } from 'react';

import type { Place } from '@site8/shared';
import type { PlaceFormValues } from '../utils/placeFormMapper';
import { toPlaceFormData, toPlaceToSave } from '../utils/placeFormMapper';

type PlaceValidationData = ReturnType<typeof toPlaceFormData>;

type UseTravelItemDialogActionsArgs = {
  readonly clearErrors: () => void;
  readonly formValues: PlaceFormValues;
  readonly item: null | Place;
  readonly onClose: () => void;
  readonly onDelete?: (itemId: number) => void;
  readonly onSave: (updatedItem: Place) => void;
  readonly validate: (data: PlaceValidationData) => boolean;
};

type UseTravelItemDialogActionsResult = {
  readonly handleCancel: () => void;
  readonly handleCopy: () => void;
  readonly handleDelete: () => void;
  readonly handleSave: () => void;
};

export const useTravelItemDialogActions = ({
  clearErrors,
  formValues,
  item,
  onClose,
  onDelete,
  onSave,
  validate,
}: UseTravelItemDialogActionsArgs): UseTravelItemDialogActionsResult => {
  const handleSave = useCallback(() => {
    const formData = toPlaceFormData(formValues);

    if (!validate(formData)) {
      return;
    }

    const itemToSave: Place = toPlaceToSave(item, formValues);
    onSave(itemToSave);
    onClose();
  }, [formValues, item, onClose, onSave, validate]);

  const handleCancel = useCallback(() => {
    clearErrors();
    onClose();
  }, [clearErrors, onClose]);

  const handleDelete = useCallback(() => {
    if (!item || !onDelete) return;

    if (
      globalThis.confirm(
        `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
      )
    ) {
      onDelete(item.id);
      onClose();
    }
  }, [item, onDelete, onClose]);

  const handleCopy = useCallback(() => {
    if (!item) return;

    const copiedItem: Place = {
      ...item,
      id: 0,
    };

    onSave(copiedItem);
  }, [item, onSave]);

  return {
    handleCancel,
    handleCopy,
    handleDelete,
    handleSave,
  };
};
