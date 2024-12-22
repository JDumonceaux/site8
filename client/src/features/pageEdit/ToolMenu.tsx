import { memo } from 'react';

import { styled } from 'styled-components';

type ToolMenuProps = {
  readonly onClick: (value: string) => void;
};

/**
 * Renders a menu for inserting HTML elements into a page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The click event handler for the menu buttons.
 * @returns {React.JSX.Element} The ToolMenu component.
 */
const ToolMenu = (
  {
    ref,
    onClick
  }: ToolMenuProps & {
    ref: React.RefObject<HTMLDivElement>;
  }
): React.JSX.Element => {
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
    <StyledSubMenu ref={ref}>
      {buttons.map(({ label, testId, value }) => (
        <button
          aria-label={`Insert ${label}`}
          data-testid={testId}
          key={value}
          onClick={() => {
            onClick(value);
          }}
          type="button">
          {label}
        </button>
      ))}
    </StyledSubMenu>
  );
};

ToolMenu.displayName = 'ToolMenu';

export default memo(ToolMenu);

const StyledSubMenu = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: left;
  button {
    margin-right: 0.5rem;
  }
`;
