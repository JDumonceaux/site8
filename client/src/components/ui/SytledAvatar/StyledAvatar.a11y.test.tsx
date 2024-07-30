import { render } from '@testing-library/react';
import { configureAxe } from 'jest-axe';
import { describe, expect, test } from 'vitest';
import StyledAvatar from './StyledAvatar';

const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

describe('StyledAvatar', () => {
  test('no jest-exe accessibility violations', async () => {
    const { container } = render(<StyledAvatar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
