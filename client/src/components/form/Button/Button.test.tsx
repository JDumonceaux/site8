import { render, screen } from '@testing-library/react';

import Button from './Button';

describe('button', () => {
  test('renders without errors', () => {
    render(<Button id="test-button">Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders with the primary variant by default', () => {
    render(<Button id="test-button">Click me</Button>);

    expect(screen.getByTestId('test-button')).toHaveStyle({
      backgroundColor: '#6db144',
      border: 'none',
      color: '#fff',
    });
  });

  test('renders with the secondary variant when specified', () => {
    render(
      <Button id="test-button" variant="secondary">
        Click me
      </Button>,
    );

    expect(screen.getByTestId('test-button')).toHaveStyle({
      backgroundColor: '#fff',
      border: '1px solid #6db144',
      color: '#000',
    });
  });

  test('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Button id="test-button" onClick={handleClick}>
        Click me
      </Button>,
    );
    screen.getByTestId('test-button').click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
