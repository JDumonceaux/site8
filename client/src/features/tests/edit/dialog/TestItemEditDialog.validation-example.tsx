/**
 * Example: TestItemEditDialog with Valibot Validation
 *
 * This file demonstrates how to integrate Valibot validation
 * into the TestItemEditDialog component.
 *
 * Key features:
 * - Field-level validation on blur
 * - Form-level validation on submit
 * - Error display using existing FieldWrapper
 * - Type-safe validation with Valibot schemas
 */

import type { JSX } from 'react';
import { useCallback, useEffect, useEffectEvent, useState } from 'react';

import Dialog from '@components/core/dialog/Dialog';
import Button from '@components/ui/button/Button';
import Input from '@components/ui/input/Input';
import useValibotValidation from '@hooks/useValibotValidation';
import {
  optionalString,
  requiredNumber,
  requiredString,
} from '@lib/validation/schemas';
import type { Test } from '@site8/shared';
import * as v from 'valibot';

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
// Component Props
// ============================================================================

type TestItemEditDialogWithValidationProps = {
  readonly groupId: null | number;
  readonly isOpen: boolean;
  readonly item: null | Test;
  readonly onClose: () => void;
  readonly onDelete?: (itemId: number) => void;
  readonly onSave: (updatedItem: Test, groupId: number) => void;
};

// ============================================================================
// Component
// ============================================================================

const TestItemEditDialogWithValidation = ({
  groupId,
  isOpen,
  item,
  onClose,
  onDelete,
  onSave,
}: TestItemEditDialogWithValidationProps): JSX.Element => {
  // Form state
  const [name, setName] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<number>(1);
  const [comments, setComments] = useState('');
  const [tags, setTags] = useState('');

  // Validation
  const { clearErrors, errors, hasErrors, validate, validateField } =
    useValibotValidation(testItemSchema);

  // Sync form state with props
  const onSyncFormState = useEffectEvent(() => {
    setName(item?.name ?? '');
    setComments(item?.comments ?? '');
    setTags(item?.tags?.join(', ') ?? '');
    setSelectedGroupId(groupId ?? 1);
    clearErrors();
  });

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-derived-state, react-you-might-not-need-an-effect/no-pass-data-to-parent
      onSyncFormState();
    }
  }, [isOpen, item?.id, onSyncFormState]);

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
   * Validate groupId on change
   */
  const handleGroupChange = useCallback(
    (value: string) => {
      const numberValue = Number(value);
      setSelectedGroupId(numberValue);
      validateField(
        'groupId',
        numberValue,
        requiredNumber('Please select a group'),
      );
    },
    [validateField],
  );

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

    // Convert to Test object
    const itemToSave: Test = item
      ? {
          ...item,
          comments: formData.comments,
          name: formData.name,
          tags: formData.tags
            ? formData.tags.split(',').map((t) => t.trim())
            : undefined,
        }
      : {
          comments: formData.comments,
          id: 0,
          name: formData.name,
          tags: formData.tags
            ? formData.tags.split(',').map((t) => t.trim())
            : undefined,
        };

    onSave(itemToSave, formData.groupId);
    onClose();
  }, [comments, item, name, onClose, onSave, selectedGroupId, tags, validate]);

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

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <Dialog
      footer={
        <div>
          <Button
            onClick={handleCancel}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            disabled={hasErrors}
            onClick={handleSave}
            variant="primary"
          >
            Save
          </Button>
        </div>
      }
      isOpen={isOpen}
      label={item ? 'Edit Test Item' : 'Add Test Item'}
      onOpenChange={onClose}
      size="lg"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {/* Name Field - Required with validation */}
        <Input.Text
          errors={errors.name}
          id="name"
          isRequired
          label="Name"
          onBlur={handleNameBlur}
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />

        {/* Group Select - Required with validation */}
        <Input.Select
          dataList={[
            { display: 'Group 1', key: '1', value: '1' },
            { display: 'Group 2', key: '2', value: '2' },
          ]}
          errors={errors.groupId}
          id="group"
          isRequired
          label="Group"
          onChange={(e) => {
            handleGroupChange(e.target.value);
          }}
          value={String(selectedGroupId)}
        />

        {/* Tags - Optional */}
        <Input.Text
          errors={errors.tags}
          id="tags"
          label="Tags (comma-separated)"
          onChange={(e) => {
            setTags(e.target.value);
          }}
          placeholder="e.g. ai, react, nodejs"
          value={tags}
        />

        {/* Comments - Optional */}
        <Input.TextArea
          errors={errors.comments}
          id="comments"
          label="Comments"
          onChange={(e) => {
            setComments(e.target.value);
          }}
          rows={4}
          value={comments}
        />
      </form>
    </Dialog>
  );
};

export default TestItemEditDialogWithValidation;
