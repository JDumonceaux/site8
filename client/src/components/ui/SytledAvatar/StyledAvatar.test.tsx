import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import StyledAvatar from './StyledAvatar';

describe('StyledAvatar', () => {
  test('renders correctly', () => {
    const { container } = render(<StyledAvatar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('has the correct styles', () => {
    const { container } = render(<StyledAvatar />);
    expect(container.firstChild).toHaveStyle(`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      overflow: hidden;
      user-select: none;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      background-color: var(--black-a3);
      margin: 5px;
    `);
  });
});