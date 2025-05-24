// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { AxeResults } from 'axe-core';
import Button from './Button';

// Add the custom matcher for a11y
expect.extend(toHaveNoViolations);

describe('button component', () => {
  test('renders primary variant with correct styles', () => {
    expect.assertions(2);

    render(<Button id="btn-primary">Click me</Button>);
    const btn = screen.getByRole('button', { name: 'Click me' });

    expect(btn).toHaveStyle('background-color: #6db144');
    expect(btn).toHaveStyle('color: #fff');
  });

  test('renders secondary variant with correct styles', () => {
    expect.assertions(3);

    render(
      <Button id="btn-secondary" variant="secondary">
        Submit
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Submit' });

    expect(btn).toHaveStyle('background-color: #fff');
    expect(btn).toHaveStyle('color: #000');
    expect(btn).toHaveStyle('border: 1px solid #6db144');
  });

  test('forwards id and name attributes', () => {
    expect.assertions(2);

    render(<Button id="unique-id">Label</Button>);
    const btn = screen.getByRole('button', { name: 'Label' });

    expect(btn).toHaveAttribute('id', 'unique-id');
    expect(btn).toHaveAttribute('name', 'unique-id');
  });

  test('handles onClick and disabled state correctly', () => {
    expect.assertions(2);

    const handleClick = jest.fn();
    // Enabled button should call onClick
    render(
      <Button id="btn-click" onClick={handleClick}>
        Click
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Click' });
    fireEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has no accessibility violations', async () => {
    expect.hasAssertions();

    const { container } = render(<Button id="btn-a11y">Accessible</Button>);
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
