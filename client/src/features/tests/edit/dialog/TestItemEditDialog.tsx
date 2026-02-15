import type { JSX } from 'react';
import { useCallback } from 'react';

import Button from '@components/button/Button';
import Dialog from '@components/dialog/Dialog';
import useValibotValidation from '@hooks/useValibotValidation';
import {
  optionalString,
  requiredNumber,
  requiredString,
} from '@lib/validation/schemas';
import type { Test } from '@site8/shared';
import * as v from 'valibot';
import useTestGroups from '../../useTestGroups';
import TestItemFormFields from './components/TestItemFormFields';
import { useCodeItemsManager } from './hooks/useCodeItemsManager';
import { useTestItemDialogActions } from './hooks/useTestItemDialogActions';
import { useTestItemFormState } from './hooks/useTestItemFormState';
import {
  FooterButtons,
  Form,
  LeftButtons,
  RightButtons,
  ScrollableContent,
} from './TestItemEditDialog.styles';

const testItemSchema = v.object({
  comments: optionalString,
  groupId: requiredNumber('Please select a group'),
  name: requiredString('Name is required'),
  tags: optionalString,
});

type TestItemEditDialogProps = {
  readonly groupId: null | number;
  readonly isOpen: boolean;
  readonly item: null | Test;
  readonly onClose: () => void;
  readonly onDelete?: (itemId: number) => void;
  readonly onSave: (updatedItem: Test, groupId: number) => void;
};

const TestItemEditDialog = ({
  groupId,
  isOpen,
  item,
  onClose,
  onDelete,
  onSave,
}: TestItemEditDialogProps): JSX.Element => {
  const { groups: availableGroups } = useTestGroups();
  const defaultGroupId = availableGroups[0]?.id ?? 1;

  const {
    codeItems,
    handleAddCode,
    handleDeleteCode,
    handleMoveCodeDown,
    handleMoveCodeUp,
    handleUpdateCode,
    resetCodeItems,
  } = useCodeItemsManager(item?.code);

  const { clearErrors, errors, hasErrors, validate, validateField } =
    useValibotValidation(testItemSchema);

  const {
    comments,
    handleGroupChange,
    isFormValid,
    name,
    selectedGroupId,
    setComments,
    setName,
    setTags,
    tags,
  } = useTestItemFormState({
    clearErrors,
    defaultGroupId,
    groupId,
    hasErrors,
    isOpen,
    item,
    resetCodeItems,
  });

  const handleNameBlur = useCallback(() => {
    validateField('name', name, requiredString('Name is required'));
  }, [name, validateField]);

  const { handleCancel, handleCopy, handleDelete, handleSave } =
    useTestItemDialogActions({
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
    });

  return (
    <Dialog
      footer={
        <FooterButtons>
          <LeftButtons>
            {item && onDelete ? (
              <Button
                onClick={handleDelete}
                variant="secondary"
              >
                Delete
              </Button>
            ) : null}
            {item ? (
              <Button
                onClick={handleCopy}
                variant="secondary"
              >
                Copy
              </Button>
            ) : null}
          </LeftButtons>
          <RightButtons>
            <Button
              onClick={handleCancel}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={!isFormValid}
              onClick={handleSave}
              variant="primary"
            >
              Save
            </Button>
          </RightButtons>
        </FooterButtons>
      }
      isOpen={isOpen}
      label={item ? 'Edit Test Item' : 'Add Test Item'}
      onOpenChange={onClose}
      size="lg"
    >
      <ScrollableContent>
        <Form>
          <TestItemFormFields
            availableGroups={availableGroups}
            codeItems={codeItems}
            comments={comments}
            errors={errors}
            name={name}
            onAddCode={handleAddCode}
            onCommentsChange={setComments}
            onDeleteCode={handleDeleteCode}
            onGroupChange={handleGroupChange}
            onMoveCodeDown={handleMoveCodeDown}
            onMoveCodeUp={handleMoveCodeUp}
            onNameBlur={handleNameBlur}
            onNameChange={setName}
            onTagsChange={setTags}
            onUpdateCode={handleUpdateCode}
            selectedGroupId={selectedGroupId}
            tags={tags}
          />
        </Form>
      </ScrollableContent>
    </Dialog>
  );
};

export default TestItemEditDialog;
