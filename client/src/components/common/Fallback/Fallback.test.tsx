import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Fallback from './Fallback';

describe('Fallback', () => {
  test('renders the loading message', () => {
    render(<Fallback />);
    const loadingMessage = screen.getByText('Loading');
    expect(loadingMessage).toBeInTheDocument();
  });

  test('renders the correct number of lines', () => {
    render(<Fallback />);
    const lines = screen.getAllByTestId('fallback-line');
    expect(lines).toHaveLength(5);
  });

  test('applies the correct styling to each line', () => {
    render(<Fallback />);
    const lines = screen.getAllByTestId('fallback-line');
    lines.forEach((line) => {
      expect(line).toHaveStyle('background: var(--palette-grey-10)');
      expect(line).toHaveStyle('height: 20px');
      expect(line).toHaveStyle('width: 100%');
      expect(line).toHaveStyle('margin-bottom: 5px');
    });
  });
});
