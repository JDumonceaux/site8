import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders without errors', () => {
    render(<Button id="test-button">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders with the primary variant by default', () => {
    render(<Button id="test-button">Click me</Button>);
    expect(screen.getByTestId('test-button')).toHaveStyle({
      color: '#fff',
      backgroundColor: '#6db144',
      border: 'none',
    });
  });

  test('renders with the secondary variant when specified', () => {
    render(
      <Button id="test-button" variant="secondary">
        Click me
      </Button>,
    );
    expect(screen.getByTestId('test-button')).toHaveStyle({
      color: '#000',
      backgroundColor: '#fff',
      border: '1px solid #6db144',
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
