import { memo } from 'react';
import { styled } from 'styled-components';

type HTMLMenuProps = {
  readonly onClick: (value: string) => void;
};

/**
 * Renders a menu for inserting HTML elements into a page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The click event handler for the menu buttons.
 * @returns {JSX.Element} The HTMLMenu component.
 */
const HTMLMenu = ({ onClick }: HTMLMenuProps): JSX.Element => {
  const buttons = [
    { label: 'Code', value: 'code', testId: 'insert-code' },
    { label: 'H2', value: 'h2', testId: 'insert-h2' },
    { label: 'Link', value: 'link', testId: 'insert-link' },
    { label: 'UL', value: 'ul', testId: 'insert-ul' },
    { label: 'OL', value: 'ol', testId: 'insert-ol' },
    { label: 'abbr', value: 'abbr', testId: 'insert-abbr' },
    { label: 'q', value: 'q', testId: 'insert-q' },
    { label: 's', value: 's', testId: 'insert-s' },
    { label: 'mark', value: 'mark', testId: 'insert-mark' },
    { label: 'sup', value: 'sup', testId: 'insert-sup' },
    { label: 'sub', value: 'sub', testId: 'insert-sub' },
  ];

  return (
    <StyledSubMenu>
      {buttons.map(({ label, value, testId }) => (
        <button
          aria-label={`Insert ${label}`}
          data-testid={testId}
          key={value}
          onClick={() => onClick(value)}
          type="button">
          {label}
        </button>
      ))}
    </StyledSubMenu>
  );
};

export default memo(HTMLMenu);

const StyledSubMenu = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: left;
  button {
    margin-right: 0.5rem;
  }
`;
