import type { JSX } from 'react';

import { FORM_CONSTANTS } from '@lib/utils/constants';
import type { TestCode } from '@site8/shared';
import { Input } from '../TestItemEditDialog.styles';
import styled from 'styled-components';

type CodeItemEditorProps = {
  readonly code: TestCode;
  readonly index: number;
  readonly isFirst: boolean;
  readonly isLast: boolean;
  readonly onDelete: (id: number) => void;
  readonly onMoveDown: (index: number) => void;
  readonly onMoveUp: (index: number) => void;
  readonly onUpdate: (id: number, field: keyof TestCode, value: string) => void;
};

const CodeItemEditor = ({
  code,
  index,
  isFirst,
  isLast,
  onDelete,
  onMoveDown,
  onMoveUp,
  onUpdate,
}: CodeItemEditorProps): JSX.Element => (
  <CodeItem>
    <CodeHeader>
      <CodeLabel>Code Block {index + 1}</CodeLabel>
      <CodeActions>
        <IconButton
          disabled={isFirst}
          onClick={() => {
            onMoveUp(index);
          }}
          title="Move up"
          type="button"
        >
          ↑
        </IconButton>
        <IconButton
          disabled={isLast}
          onClick={() => {
            onMoveDown(index);
          }}
          title="Move down"
          type="button"
        >
          ↓
        </IconButton>
        <IconButton
          onClick={() => {
            onDelete(code.id);
          }}
          title="Delete"
          type="button"
        >
          ✕
        </IconButton>
      </CodeActions>
    </CodeHeader>
    <CodeFields>
      <SmallFormField>
        <SmallLabel htmlFor={`type-${code.id}`}>Type</SmallLabel>
        <Input
          id={`type-${code.id}`}
          onChange={(e) => {
            onUpdate(code.id, 'type', e.target.value);
          }}
          placeholder="e.g. javascript, typescript"
          type="text"
          value={code.type}
        />
      </SmallFormField>
      <SmallFormField>
        <SmallLabel htmlFor={`content-${code.id}`}>Content</SmallLabel>
        <CodeTextArea
          id={`content-${code.id}`}
          onChange={(e) => {
            onUpdate(code.id, 'content', e.target.value);
          }}
          placeholder="Enter code here..."
          rows={FORM_CONSTANTS.CODE_CONTENT_ROWS}
          value={code.content}
        />
      </SmallFormField>
    </CodeFields>
  </CodeItem>
);

export default CodeItemEditor;

const CodeItem = styled.div`
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  padding: 1rem;
  background: var(--background-secondary);
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CodeLabel = styled.div`
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
  font-size: 0.875rem;
`;

const CodeActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  background: var(--background-color);
  color: var(--text-primary-color);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const CodeFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SmallFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SmallLabel = styled.label`
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary-color);
`;

const CodeTextArea = styled.textarea`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  color: var(--text-primary-color);
  background: var(--background-color);
  font-family: 'Courier New', monospace;
  resize: vertical;

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
`;
