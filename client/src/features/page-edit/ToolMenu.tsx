import type { JSX } from 'react';

import styled from 'styled-components';

type ToolMenuProps = {
  readonly onClick: (value: string) => void;
};

const ToolMenu = ({ onClick }: ToolMenuProps): JSX.Element => {
  const buttons = [
    { label: 'Code', testId: 'insert-code', value: 'code' },
    { label: 'H2', testId: 'insert-h2', value: 'h2' },
    { label: 'Link', testId: 'insert-link', value: 'link' },
    { label: 'UL', testId: 'insert-ul', value: 'ul' },
    { label: 'OL', testId: 'insert-ol', value: 'ol' },
    { label: 'abbr', testId: 'insert-abbr', value: 'abbr' },
    { label: 'q', testId: 'insert-q', value: 'q' },
    { label: 's', testId: 'insert-s', value: 's' },
    { label: 'mark', testId: 'insert-mark', value: 'mark' },
    { label: 'sup', testId: 'insert-sup', value: 'sup' },
    { label: 'sub', testId: 'insert-sub', value: 'sub' },
  ];

  return (
    <StyledSubMenu>
      {buttons.map(({ label, testId, value }) => (
        <button
          key={value}
          aria-label={`Insert ${label}`}
          data-testid={testId}
          type="button"
          onClick={() => {
            onClick(value);
          }}
        >
          {label}
        </button>
      ))}
    </StyledSubMenu>
  );
};

ToolMenu.displayName = 'ToolMenu';

export default ToolMenu;

const StyledSubMenu = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: left;
  button {
    margin-inline-end: 0.5rem;
  }
`;
