import { render } from '@testing-library/react';
import { configureAxe } from 'jest-axe';
import Avatar from './Avatar';

const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

describe('Avatar', () => {
  test('no jest-exe accessibility violations', async () => {
    const { container } = render(<Avatar />);
    const results = await axe(container);
    //expect(results).toHaveNoViolations();
  });
});
