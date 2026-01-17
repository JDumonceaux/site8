import type { JSX } from 'react';
import { useCallback, useState } from 'react';

import Dialog from '@components/core/dialog/Dialog';
import Button from '@components/ui/button/Button';
import type { Test, TestGroup } from '@site8/shared';
import styled from 'styled-components';

type TestItemEditDialogProps = {
  readonly availableGroups: readonly TestGroup[];
  readonly isOpen: boolean;
  readonly item: null | Test;
  readonly onClose: () => void;
  readonly onSave: (updatedItem: Test) => void;
};

const TestItemEditDialog = ({
  availableGroups,
  isOpen,
  item,
  onClose,
  onSave,
}: TestItemEditDialogProps): JSX.Element => {
  const [name, setName] = useState(item?.name ?? '');
  const [selectedGroupId, setSelectedGroupId] = useState<number>(1);
  const [comments, setComments] = useState(item?.comments ?? '');
  const [tags, setTags] = useState(item?.tags?.join(', ') ?? '');

  const handleSave = useCallback(() => {
    if (!item) return;

    const updatedItem: Test = {
      ...item,
      comments: comments.trim() || undefined,
      name,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    };

    onSave(updatedItem);
    onClose();
  }, [item, name, comments, tags, onSave, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Dialog
      footer={
        <FooterButtons>
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
        </FooterButtons>
      }
      isOpen={isOpen}
      label="Edit Test Item"
      onOpenChange={onClose}
      size="lg"
    >
      <Form>
        <FormField>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            value={name}
          />
        </FormField>

        <FormField>
          <Label htmlFor="group">Group</Label>
          <Select
            id="group"
            onChange={(e) => {
              setSelectedGroupId(Number(e.target.value));
            }}
            value={selectedGroupId}
          >
            {availableGroups.map((group) => (
              <option
                key={group.id}
                value={group.id}
              >
                {group.name}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            onChange={(e) => {
              setTags(e.target.value);
            }}
            placeholder="e.g. ai, react, nodejs"
            type="text"
            value={tags}
          />
        </FormField>

        <FormField>
          <Label htmlFor="comments">Comments</Label>
          <TextArea
            id="comments"
            onChange={(e) => {
              setComments(e.target.value);
            }}
            rows={4}
            value={comments}
          />
        </FormField>
      </Form>
    </Dialog>
  );
};

export default TestItemEditDialog;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
`;

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  color: var(--text-primary-color);
  background: var(--background-color);

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  color: var(--text-primary-color);
  background: var(--background-color);

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  color: var(--text-primary-color);
  background: var(--background-color);
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
`;

const FooterButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
