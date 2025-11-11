// Tooltip.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';

import type { AxeResults } from 'axe-core';
import { axe, toHaveNoViolations } from 'jest-axe';
import Tooltip from './Tooltip';
import '@testing-library/jest-dom';
import 'jest-styled-components';

describe('tooltip component', () => {
  beforeAll(() => {
    expect.extend(toHaveNoViolations);
  });

  test('renders nothing when no trigger or content provided', () => {
    expect.assertions(1);

    const { container } = render(<Tooltip />);

    expect(container).toBeEmptyDOMElement();
  });

  test('applies triggerColor style to trigger element', async () => {
    expect.assertions(2);

    render(
      <Tooltip
        trigger={<button>Info</button>}
        content="Details"
        triggerColor="hotpink"
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Info' });

    expect(trigger).toHaveStyle('color: hotpink');

    // Hover to show tooltip, then check background style
    fireEvent.mouseOver(trigger);
    const tooltip = await screen.findByRole('tooltip');

    expect(tooltip).toHaveStyle('background-color: #000');
  });

  test('renders number content correctly', async () => {
    expect.assertions(2);

    render(
      <Tooltip
        trigger={<span>Count</span>}
        content={123}
      />,
    );
    const trigger = screen.getByText('Count');
    fireEvent.mouseOver(trigger);
    const tooltip = await screen.findByRole('tooltip');

    expect(tooltip).toHaveTextContent('123');
    expect(tooltip).toHaveStyle('color: var(--tooltip-label-color)');
  });

  test('has no accessibility violations', async () => {
    expect.hasAssertions();

    const { container } = render(
      <Tooltip
        trigger={<button>Hover me</button>}
        content="Accessible"
      />,
    );
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
