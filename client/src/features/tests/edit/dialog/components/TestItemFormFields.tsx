import type { JSX } from 'react';

import IconButton from '@components/ui/button/icon-button/IconButton';
import { AddIcon } from '@components/ui/icons';
import Input from '@components/ui/input/Input';
import type { TestCode, TestGroup } from '@site8/shared';
import CodeItemEditor from './CodeItemEditor';
import {
  EmptyMessage,
  FormField,
  Label,
  LabelRow,
} from '../TestItemEditDialog.styles';

type FieldError = {
  message: string;
};

type FormErrors = {
  comments?: string;
  groupId?: string;
  name?: string;
  tags?: string;
};

type TestItemFormFieldsProps = {
  readonly availableGroups: readonly TestGroup[];
  readonly codeItems: readonly TestCode[];
  readonly comments: string;
  readonly errors: FormErrors;
  readonly name: string;
  readonly onAddCode: () => void;
  readonly onCommentsChange: (value: string) => void;
  readonly onDeleteCode: (id: number) => void;
  readonly onGroupChange: (value: string) => void;
  readonly onMoveCodeDown: (index: number) => void;
  readonly onMoveCodeUp: (index: number) => void;
  readonly onNameBlur: () => void;
  readonly onNameChange: (value: string) => void;
  readonly onTagsChange: (value: string) => void;
  readonly onUpdateCode: (
    id: number,
    field: keyof TestCode,
    value: string,
  ) => void;
  readonly selectedGroupId: number;
  readonly tags: string;
};

const toFieldErrors = (error: string | undefined): FieldError[] | undefined => {
  if (!error) return undefined;
  return [{ message: error }];
};

const TestItemFormFields = ({
  availableGroups,
  codeItems,
  comments,
  errors,
  name,
  onAddCode,
  onCommentsChange,
  onDeleteCode,
  onGroupChange,
  onMoveCodeDown,
  onMoveCodeUp,
  onNameBlur,
  onNameChange,
  onTagsChange,
  onUpdateCode,
  selectedGroupId,
  tags,
}: TestItemFormFieldsProps): JSX.Element => {
  return (
    <>
      <Input.Text
        errors={toFieldErrors(errors.name)}
        id="name"
        isRequired
        label="Name"
        onBlur={onNameBlur}
        onChange={(e) => {
          onNameChange(e.target.value);
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
          onGroupChange(e.target.value);
        }}
        value={String(selectedGroupId)}
      />
      <Input.Text
        errors={toFieldErrors(errors.tags)}
        id="tags"
        label="Tags (comma-separated)"
        onChange={(e) => {
          onTagsChange(e.target.value);
        }}
        placeholder="e.g. ai, react, nodejs"
        value={tags}
      />
      <FormField>
        <LabelRow>
          <Label>Code Items</Label>
          <IconButton
            aria-label="Add code item"
            onClick={onAddCode}
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
              onDelete={onDeleteCode}
              onMoveDown={onMoveCodeDown}
              onMoveUp={onMoveCodeUp}
              onUpdate={onUpdateCode}
            />
          ))
        )}
      </FormField>
      <Input.TextArea
        errors={toFieldErrors(errors.comments)}
        id="comments"
        label="Comments"
        onChange={(e) => {
          onCommentsChange(e.target.value);
        }}
        rows={4}
        value={comments}
      />
    </>
  );
};

export default TestItemFormFields;
