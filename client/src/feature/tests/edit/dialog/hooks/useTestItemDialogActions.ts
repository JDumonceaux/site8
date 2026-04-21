import { useCallback } from 'react';

import type { Test, TestCode } from '@site8/shared';
import { CODE_TYPE_SUGGESTIONS } from '../code-type-suggestions';
import { parseTags } from '../utils';

type TestItemValidationData = {
  comments?: string;
  groupId: number;
  name: string;
  tags?: string;
};

type UseTestItemDialogActionsArgs = {
  readonly clearErrors: () => void;
  readonly codeItems: readonly TestCode[];
  readonly comments: string;
  readonly item: null | Test;
  readonly name: string;
  readonly onClose: () => void;
  readonly onDelete?: (itemId: number) => void;
  readonly onSave: (updatedItem: Test, groupId: number) => void;
  readonly selectedGroupId: number;
  readonly tags: string;
  readonly validate: (data: TestItemValidationData) => boolean;
};

type UseTestItemDialogActionsResult = {
  readonly handleCancel: () => void;
  readonly handleCopy: () => void;
  readonly handleDelete: () => void;
  readonly handleSave: () => void;
};

const normalizeCodeType = (codeType: string): string => {
  const matchedSuggestion = CODE_TYPE_SUGGESTIONS.find(
    (suggestion) => suggestion.value.toLowerCase() === codeType.toLowerCase(),
  );

  return matchedSuggestion?.value ?? codeType;
};

export const useTestItemDialogActions = ({
  clearErrors,
  codeItems,
  comments,
  item,
  name,
  onClose,
  onDelete,
  onSave,
  selectedGroupId,
  tags,
  validate,
}: UseTestItemDialogActionsArgs): UseTestItemDialogActionsResult => {
  const handleSave = useCallback(() => {
    const formData: TestItemValidationData = {
      comments: comments.trim() || undefined,
      groupId: selectedGroupId,
      name,
      tags: tags.trim() || undefined,
    };

    if (!validate(formData)) {
      return;
    }

    const normalizedCodeItems = codeItems.map((codeItem) => ({
      ...codeItem,
      type: normalizeCodeType(codeItem.type),
    }));

    const itemToSave: Test = item
      ? {
          ...item,
          code:
            normalizedCodeItems.length > 0 ? normalizedCodeItems : undefined,
          comments: comments.trim() || undefined,
          name,
          tags: parseTags(tags),
        }
      : {
          code:
            normalizedCodeItems.length > 0 ? normalizedCodeItems : undefined,
          comments: comments.trim() || undefined,
          id: 0,
          name,
          tags: parseTags(tags),
        };

    onSave(itemToSave, selectedGroupId);
    onClose();
  }, [
    codeItems,
    comments,
    item,
    name,
    onClose,
    onSave,
    selectedGroupId,
    tags,
    validate,
  ]);

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

    const copiedItem: Test = {
      ...item,
      id: 0,
    };

    onSave(copiedItem, selectedGroupId);
  }, [item, onSave, selectedGroupId]);

  return {
    handleCancel,
    handleCopy,
    handleDelete,
    handleSave,
  };
};
