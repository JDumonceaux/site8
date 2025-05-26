// InputColor.test.tsx
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { AxeResults } from 'axe-core';
import InputColor from './InputColor';

describe('inputColor component', () => {
  beforeAll(() => {
    expect.extend(toHaveNoViolations);
  });

  test('renders an input[type="color"] with correct defaults and style', () => {
    expect.assertions(2);

    const { container } = render(<InputColor />);
    const input = container.querySelector('input[type="color"]');

    expect(input).toBeInTheDocument();
    expect(input).toHaveStyle('width: 100%');
  });

  test('calls onChange and updates value correctly', () => {
    expect.assertions(3);

    const handleChange = jest.fn();
    const { container } = render(<InputColor onChange={handleChange} />);
    const input = container.querySelector('input[type="color"]');
    if (input) {
      fireEvent.change(input, { target: { value: '#123456' } });
    }

    expect(handleChange).toHaveBeenCalledTimes(1);
    // Ensure the native input value updates
    expect(input).toHaveValue('#123456');

    // Check that the handler received the correct event value
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const eventArg = handleChange.mock.calls[0][0];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(eventArg.target.value).toBe('#123456');
  });

  test('does not call onChange when disabled', () => {
    expect.assertions(1);

    const handleChange = jest.fn();
    const { container } = render(
      <InputColor onChange={handleChange} disabled />,
    );
    const input = container.querySelector('input[type="color"]');
    if (input) {
      fireEvent.change(input, { target: { value: '#654321' } });
    }

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('has no accessibility violations', async () => {
    expect.hasAssertions();

    const { container } = render(<InputColor />);
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
