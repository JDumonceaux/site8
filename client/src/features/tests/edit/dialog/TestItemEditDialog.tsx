import type { JSX } from 'react';
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from 'react';

import Dialog from '@components/core/dialog/Dialog';
import { Button } from '@components/ui';
import IconButton from '@components/ui/button/icon-button/IconButton';
import { AddIcon } from '@components/ui/icons';
import Input from '@components/ui/input/Input';
import useValibotValidation from '@hooks/useValibotValidation';
import {
  optionalString,
  requiredNumber,
  requiredString,
} from '@lib/validation/schemas';
import type { Test } from '@site8/shared';
import type { FieldError } from '@types';
import * as v from 'valibot';
import useTestGroups from '../../useTestGroups';
import CodeItemEditor from './components/CodeItemEditor';
import { CODE_TYPE_SUGGESTIONS } from './code-type-suggestions';
import { useCodeItemsManager } from './hooks/useCodeItemsManager';
import {
  EmptyMessage,
  FooterButtons,
  Form,
  FormField,
  Label,
  LabelRow,
  LeftButtons,
  RightButtons,
  ScrollableContent,
} from './TestItemEditDialog.styles';
import { formatTags, parseTags } from './utils';

// ============================================================================
// Validation Schema
// ============================================================================

/**
 * Valibot schema for Test item form
 */
const testItemSchema = v.object({
  comments: optionalString,
  groupId: requiredNumber('Please select a group'),
  name: requiredString('Name is required'),
  tags: optionalString,
});

type TestItemFormData = v.InferOutput<typeof testItemSchema>;

// ============================================================================
// Helpers
// ============================================================================

/**
 * Convert string error messages to FieldError array format
 */
const toFieldErrors = (error: string | undefined): FieldError[] | undefined => {
  if (!error) return undefined;
  return [{ message: error }];
};

const normalizeCodeType = (codeType: string): string => {
  const matchedSuggestion = CODE_TYPE_SUGGESTIONS.find(
    (suggestion) => suggestion.value.toLowerCase() === codeType.toLowerCase(),
  );

  return matchedSuggestion?.value ?? codeType;
};

// ============================================================================
// Component Props
// ============================================================================

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
  const [name, setName] = useState(item?.name ?? '');
  const [selectedGroupId, setSelectedGroupId] = useState<number>(
    groupId ?? defaultGroupId,
  );
  const [comments, setComments] = useState(item?.comments ?? '');
  const [tags, setTags] = useState(formatTags(item?.tags));

  const {
    codeItems,
    handleAddCode,
    handleDeleteCode,
    handleMoveCodeDown,
    handleMoveCodeUp,
    handleUpdateCode,
    resetCodeItems,
  } = useCodeItemsManager(item?.code);

  // Validation
  const { clearErrors, errors, hasErrors, validate, validateField } =
    useValibotValidation(testItemSchema);

  // Check if required fields are filled
  const isFormValid = useMemo(
    () => name.trim().length > 0 && selectedGroupId > 0 && !hasErrors,
    [name, selectedGroupId, hasErrors],
  );

  // Effect event for syncing form state with props
  const onSyncFormState = useEffectEvent(() => {
    setName(item?.name ?? '');
    setComments(item?.comments ?? '');
    setTags(formatTags(item?.tags));
    setSelectedGroupId(groupId ?? defaultGroupId);
    resetCodeItems(item?.code ?? []);
    clearErrors();
  });

  // Sync state when dialog opens with new data
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-pass-data-to-parent, react-you-might-not-need-an-effect/no-derived-state
      onSyncFormState();
    }
  }, [isOpen, item?.id]);

  // ============================================================================
  // Validation Handlers
  // ============================================================================

  /**
   * Validate name field on blur
   */
  const handleNameBlur = useCallback(() => {
    validateField('name', name, requiredString('Name is required'));
  }, [name, validateField]);

  /**
   * Handle group selection change
   */
  const handleGroupChange = useCallback((value: string) => {
    const numberValue = Number(value);
    setSelectedGroupId(numberValue);
    // Note: No field-level validation needed for select with predefined options
    // Form-level validation on submit will ensure groupId is valid
  }, []);

  // ============================================================================
  // Form Submission
  // ============================================================================

  /**
   * Handle form submission with validation
   */
  const handleSave = useCallback(() => {
    const formData: TestItemFormData = {
      comments: comments.trim() || undefined,
      groupId: selectedGroupId,
      name,
      tags: tags.trim(),
    };

    // Validate entire form
    if (!validate(formData)) {
      return; // Stop if validation fails
    }

    const normalizedCodeItems = codeItems.map((codeItem) => ({
      ...codeItem,
      type: normalizeCodeType(codeItem.type),
    }));

    // Convert to Test object
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
    comments,
    item,
    name,
    onClose,
    onSave,
    selectedGroupId,
    tags,
    codeItems,
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

  const handleCopy = (): void => {
    if (!item) return;

    const copiedItem: Test = {
      ...item,
      id: 0, // New item will get a new id from the server
    };

    onSave(copiedItem, selectedGroupId);
    // Don't call onClose() - keep dialog open
  };

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
          <Input.Text
            errors={toFieldErrors(errors.name)}
            id="name"
            isRequired
            label="Name"
            onBlur={handleNameBlur}
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <Input.Select
            dataList={availableGroups.map((group) => ({
              display: `${group.sectionName ?? 'Unknown Section'}- ${group.name}- ${group.id}`,
              key: String(group.id),
              value: String(group.id),
            }))}
            errors={toFieldErrors(errors.groupId)}
            id="group"
            isRequired
            label="Group"
            onChange={(e) => {
              handleGroupChange(e.target.value);
            }}
            value={String(selectedGroupId)}
          />
          <Input.Text
            errors={toFieldErrors(errors.tags)}
            id="tags"
            label="Tags (comma-separated)"
            onChange={(e) => {
              setTags(e.target.value);
            }}
            placeholder="e.g. ai, react, nodejs"
            value={tags}
          />
          <FormField>
            <LabelRow>
              <Label>Code Items</Label>
              <IconButton
                aria-label="Add code item"
                onClick={handleAddCode}
              >
                <AddIcon />
              </IconButton>
            </LabelRow>
            {codeItems.length === 0 ? (
              <EmptyMessage>
                No code items. Click the plus icon to create one.
              </EmptyMessage>
            ) : (
              codeItems.map((code, index) => (
                <CodeItemEditor
                  code={code}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === codeItems.length - 1}
                  key={code.id}
                  onDelete={handleDeleteCode}
                  onMoveDown={handleMoveCodeDown}
                  onMoveUp={handleMoveCodeUp}
                  onUpdate={handleUpdateCode}
                />
              ))
            )}
          </FormField>
          <Input.TextArea
            errors={toFieldErrors(errors.comments)}
            id="comments"
            label="Comments"
            onChange={(e) => {
              setComments(e.target.value);
            }}
            rows={4}
            value={comments}
          />
        </Form>
      </ScrollableContent>
    </Dialog>
  );
};

export default TestItemEditDialog;
