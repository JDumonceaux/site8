import { fireEvent, render, screen } from '@testing-library/react';

import type { AxeResults } from 'axe-core';
import { SnackbarVariant } from '@features/app/Snackbar/useSnackbar';
import { axe, toHaveNoViolations } from 'jest-axe';
import Snackbar from './Snackbar';
// Snackbar.test.tsx
import '@testing-library/jest-dom';
import 'jest-styled-components';

// Mock the snackbar hook and variant constants
const mockClose = jest.fn();
let mockData: any;

jest.mock('@features/app/useSnackbar', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  default: () => ({ closeSnackbar: mockClose, data: mockData }),
  SnackbarVariant: {
    ERROR: SnackbarVariant.ERROR,
    INFO: SnackbarVariant.INFO,
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
      contents: 'Hello World',
      isOpen: true,
      variant: SnackbarVariant.INFO,
    };
    render(<Snackbar />);
    const snackbar = screen.getByTestId('snackbar');

    expect(snackbar).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /close notification/i });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('applies default styling for INFO variant', () => {
    expect.assertions(2);

    mockData = {
      contents: 'Info',
      isOpen: true,
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
      contents: 'Error occurred',
      isOpen: true,
      variant: SnackbarVariant.ERROR,
    };
    render(<Snackbar />);
    const snackbar = screen.getByTestId('snackbar');

    expect(snackbar).toHaveStyle('color: var(--palette-error)');
  });

  it('has no accessibility violations when open', async () => {
    expect.hasAssertions();

    mockData = {
      contents: 'Accessible',
      isOpen: true,
      variant: SnackbarVariant.INFO,
    };
    const { container } = render(<Snackbar />);
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
