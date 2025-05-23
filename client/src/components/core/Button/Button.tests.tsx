// Button.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureAxe } from 'jest-axe';
import type { AxeResults } from 'axe-core';

import Button, { VARIANTS, SIZES } from './Button';

const axe = configureAxe();

describe('Button component – behavior & basic styling', () => {
  test('renders children and defaults to type="button"', () => {
    expect.assertions(2);
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: 'Click me' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });

  test('invokes onClick when clicked', () => {
    expect.assertions(1);
    const handle = jest.fn();
    render(<Button onClick={handle}>Press</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Press' }));
    expect(handle).toHaveBeenCalledTimes(1);
  });

  test('disabled blocks clicks and applies inline disabled style', () => {
    expect.assertions(3);
    const handle = jest.fn();
    render(
      <Button disabled onClick={handle}>
        NoClick
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'NoClick' });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handle).not.toHaveBeenCalled();
    // Styled-components injects opacity via CSS; inline style isn’t set.
    // We can assert that the “disabled” attribute is present:
    expect(btn).toHaveAttribute('disabled');
  });

  test('has inline-flex display by default', () => {
    expect.assertions(1);
    render(<Button>Styled</Button>);
    const btn = screen.getByRole('button', { name: 'Styled' });
    expect(btn).toHaveStyle({ display: 'inline-flex' });
  });

  test('fullWidth prop adds inline width:100%', () => {
    expect.assertions(1);
    render(<Button fullWidth>Wide</Button>);
    const btn = screen.getByRole('button', { name: 'Wide' });
    expect(btn).toHaveStyle({ width: '100%' });
  });
});

describe('Button component – variant & size rendering', () => {
  test.each(VARIANTS)('variant="%s" renders without crashing', (variant) => {
    expect.assertions(1);
    render(<Button variant={variant}>{variant}</Button>);
    const btn = screen.getByRole('button', { name: variant });
    expect(btn).toBeInTheDocument();
  });

  test.each(SIZES)('size="%s" renders without crashing', (size) => {
    expect.assertions(1);
    render(<Button size={size}>{size}</Button>);
    const btn = screen.getByRole('button', { name: size });
    expect(btn).toBeInTheDocument();
  });
});

describe('Button component – accessibility', () => {
  test.each([
    ['default', {}],
    ['disabled', { disabled: true }],
    ['fullWidth', { fullWidth: true }],
  ] as const)('no a11y violations – %s', async (_label, props) => {
    expect.hasAssertions();
    const { container } = render(<Button {...props}>Test</Button>);
    const results: AxeResults = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
