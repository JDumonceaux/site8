import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders without errors', () => {
    render(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('includes the menu icon when includeMenu prop is true', () => {
    render(<Header includeMenu={true} />);
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('does not include the menu icon when includeMenu prop is false', () => {
    render(<Header includeMenu={false} />);
    expect(screen.queryByTestId('menu-icon')).toBeNull();
  });

  it('renders the app name correctly', () => {
    render(<Header />);
    expect(screen.getByText('YourAppName')).toBeInTheDocument();
  });
});
