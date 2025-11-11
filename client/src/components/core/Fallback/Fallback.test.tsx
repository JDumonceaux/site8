import { render, screen } from '@testing-library/react';

import Fallback from './Fallback';
// eslint-disable-next-line import/no-unassigned-import -- Extends Jest matchers
import '@testing-library/jest-dom';

describe('fallback component', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('renders PageTitle with "Loading…"', () => {
    expect.assertions(1);

    render(<Fallback />);

    // PageTitle renders an h1 with the title prop
    expect(
      screen.getByRole('heading', { name: 'Loading…' }),
    ).toBeInTheDocument();
  });

  test('container has aria-live="polite"', () => {
    expect.assertions(1);

    render(<Fallback />);

    expect(
      screen.getByRole('heading', { name: 'Loading…' }).parentElement,
    ).toHaveAttribute('aria-live', 'polite');
  });

  test('default lines count is 5 with correct widths', () => {
    expect.assertions(5);

    render(<Fallback />);
    const lines = screen.getAllByTestId('fallback-line');

    expect(lines).toHaveLength(5);

    const expectedWidths = [100, 90, 80, 100, 90];
    for (const [index, line] of lines.entries()) {
      expect(line).toHaveStyle(`width: ${expectedWidths[index]}%`);
    }
  });

  test('fractional lines prop is floored without warning', () => {
    expect.assertions(2);

    const warnSpy = jest.spyOn(console, 'warn');
    render(<Fallback lines={3.7} />);
    const lines = screen.getAllByTestId('fallback-line');

    expect(lines).toHaveLength(3);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  test('lines below MIN_LINES clamp to 1 and warn', () => {
    expect.assertions(3);

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      // Mock implementation to suppress console warnings
    });
    render(<Fallback lines={0} />);
    const lines = screen.getAllByTestId('fallback-line');

    expect(lines).toHaveLength(1);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Fallback: `lines` must be an integer between 1 and 20',
      ),
    );
  });

  test('lines above MAX_LINES clamp to 20 and warn', () => {
    expect.assertions(3);

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      // Mock implementation to suppress console warnings
    });
    render(<Fallback lines={25} />);
    const lines = screen.getAllByTestId('fallback-line');

    expect(lines).toHaveLength(20);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Fallback: `lines` must be an integer between 1 and 20',
      ),
    );
  });

  test('each line has correct styling', () => {
    expect.hasAssertions();

    render(<Fallback lines={3} />);
    const lines = screen.getAllByTestId('fallback-line');
    for (const line of lines) {
      expect(line).toHaveStyle('height: 1.25rem');
      expect(line).toHaveStyle('border-radius: 0.375rem');
      expect(line).toHaveStyle(
        'background: linear-gradient(90deg, var(--palette-grey-10) 25%, var(--palette-grey-20) 37%, var(--palette-grey-10) 63%)',
      );
      expect(line).toHaveStyle('animation:');
    }
  });
});
