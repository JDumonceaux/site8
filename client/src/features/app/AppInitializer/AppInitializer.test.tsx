// AppInitializer.test.jsx

import { render } from '@testing-library/react';

import type { AxeResults } from 'axe-core';
import { axe } from 'jest-axe';
import AppInitializer from './AppInitializer';
import '@testing-library/jest-dom';
import 'jest-styled-components';

describe('appInitializer component', () => {
  test('should render null', () => {
    expect.hasAssertions();

    const { container } = render(<AppInitializer />);

    expect(container.firstChild).toBeNull();
  });

  test('should not introduce any accessibility violations', async () => {
    expect.hasAssertions();

    const { container } = render(<AppInitializer />);
    const results: AxeResults = await axe(container);

    expect(results.violations).toHaveLength(0);
  });

  test('renders without crashing when unmounted and remounted (edge case)', () => {
    expect.hasAssertions();

    const { container, rerender, unmount } = render(<AppInitializer />);

    expect(container.firstChild).toBeNull();

    // Unmount and remount to simulate edge‐case lifecycle
    unmount();
    rerender(<AppInitializer />);

    expect(container.firstChild).toBeNull();
  });
});
