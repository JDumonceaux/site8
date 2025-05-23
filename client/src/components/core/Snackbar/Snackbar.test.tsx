// Snackbar.test.tsx
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { AxeResults } from 'axe-core';

import Snackbar from './Snackbar';
import { SnackbarVariant } from 'features/app/useSnackbar';

// Mock the snackbar hook and variant constants
const mockClose = jest.fn();
let mockData: any;

jest.mock('features/app/useSnackbar', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  default: () => ({ data: mockData, closeSnackbar: mockClose }),
  SnackbarVariant: {
    INFO: SnackbarVariant.INFO,
    ERROR: SnackbarVariant.ERROR,
  },
}));

expect.extend(toHaveNoViolations);

describe('snackbar component', () => {
  beforeEach(() => {
    mockClose.mockClear();
  });

  it('renders nothing when no data or not open', () => {
    expect.assertions(1);

    mockData = undefined;
    render(<Snackbar />);

    expect(screen.queryByTestId('snackbar')).toBeNull();
  });

  it('renders message and close button when open', () => {
    expect.assertions(4);

    mockData = {
      isOpen: true,
      contents: 'Hello World',
      variant: SnackbarVariant.INFO,
    };
    render(<Snackbar />);
    const snackbar = screen.getByTestId('snackbar');

    expect(snackbar).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Close notification/i });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('applies default styling for INFO variant', () => {
    expect.assertions(2);

    mockData = {
      isOpen: true,
      contents: 'Info',
      variant: SnackbarVariant.INFO,
    };
    render(<Snackbar />);
    const snackbar = screen.getByTestId('snackbar');

    expect(snackbar).toHaveStyle('position: fixed');
    expect(snackbar).toHaveStyle('display: flex');
  });

  it('applies error color for ERROR variant', () => {
    expect.assertions(1);

    mockData = {
      isOpen: true,
      contents: 'Error occurred',
      variant: SnackbarVariant.ERROR,
    };
    render(<Snackbar />);
    const snackbar = screen.getByTestId('snackbar');

    expect(snackbar).toHaveStyle('color: var(--palette-error)');
  });

  it('has no accessibility violations when open', async () => {
    expect.hasAssertions();

    mockData = {
      isOpen: true,
      contents: 'Accessible',
      variant: SnackbarVariant.INFO,
    };
    const { container } = render(<Snackbar />);
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
