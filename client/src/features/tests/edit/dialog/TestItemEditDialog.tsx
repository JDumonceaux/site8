import type { JSX } from 'react';
import { useCallback, useEffect, useEffectEvent, useState } from 'react';

import Dialog from '@components/core/dialog/Dialog';
import Button from '@components/ui/button/Button';
import Input from '@components/ui/input/Input';
import type { Test } from '@site8/shared';
import useTestGroups from '../../useTestGroups';
import CodeItemEditor from './components/CodeItemEditor';
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
  } = useCodeItemsManager(item?.code);

  // Effect event for syncing form state with props
  const onSyncFormState = useEffectEvent(() => {
    setName(item?.name ?? '');
    setComments(item?.comments ?? '');
    setTags(formatTags(item?.tags));
    setSelectedGroupId(groupId ?? defaultGroupId);
  });

  // Sync state when dialog opens with new data
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-pass-data-to-parent, react-you-might-not-need-an-effect/no-derived-state
      onSyncFormState();
    }
  }, [isOpen, item?.id]);

  const handleSave = useCallback(() => {
    const itemToSave: Test = item
      ? {
          ...item,
          code: codeItems.length > 0 ? codeItems : undefined,
          comments: comments.trim() || undefined,
          name,
          tags: parseTags(tags),
        }
      : {
          code: codeItems.length > 0 ? codeItems : undefined,
          comments: comments.trim() || undefined,
          id: 0,
          name,
          tags: parseTags(tags),
        };

    onSave(itemToSave, selectedGroupId);
    onClose();
  }, [item, name, comments, tags, codeItems, selectedGroupId, onSave, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

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
            id="name"
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            value={name}
          />
          <Input.Select
            dataList={availableGroups.map((group) => ({
              display: `${group.sectionName ?? 'Unknown Section'}- ${group.name}- ${group.id}`,
              key: String(group.id),
              value: String(group.id),
            }))}
            id="group"
            label="Group"
            onChange={(e) => {
              setSelectedGroupId(Number(e.target.value));
            }}
            value={String(selectedGroupId)}
          />
          <Input.Text
            id="tags"
            label="Tags (comma-separated)"
            onChange={(e) => {
              setTags(e.target.value);
            }}
            placeholder="e.g. ai, react, nodejs"
            value={tags}
          />
          <Input.TextArea
            id="comments"
            label="Comments"
            onChange={(e) => {
              setComments(e.target.value);
            }}
            rows={4}
            value={comments}
          />
          <FormField>
            <LabelRow>
              <Label>Code Items</Label>
              <Button
                onClick={handleAddCode}
                size="sm"
                variant="primary"
              >
                Add Code
              </Button>
            </LabelRow>
            {codeItems.length === 0 ? (
              <EmptyMessage>
                No code items. Click &apos;Add Code&apos; to create one.
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
        </Form>
      </ScrollableContent>
    </Dialog>
  );
};

export default TestItemEditDialog;
