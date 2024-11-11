import { render, screen } from '@testing-library/react';
import TestPage from 'pages/TestPage';

import { APP_NAME } from '../lib/utils/constants';
import Header from './Header';

describe('Header', () => {
  test('renders without errors', () => {
    render(
      <TestPage>
        <Header />
      </TestPage>,
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('includes the menu icon when includeMenu prop is true', () => {
    render(<Header includeMenu={true} />);
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  test('does not include the menu icon when includeMenu prop is false', () => {
    render(<Header includeMenu={false} />);
    expect(screen.queryByTestId('menu-icon')).toBeNull();
  });

  test('renders the app name correctly', () => {
    render(<Header />);
    expect(screen.getByText(APP_NAME)).toBeInTheDocument();
  });

  test('renders styles correctly', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    const styles = getComputedStyle(header);

    expect(styles.backgroundColor).toBe('rgb(0, 0, 0)');
    expect(styles.display).toBe('flex');
    expect(styles.flexFlow).toBe('row nowrap');
    expect(styles.justifyContent).toBe('space-between');
    expect(styles.alignItems).toBe('center');
    expect(styles.minHeight).toBe('40px');
    expect(styles.width).toBe('100%');
    expect(styles.position).toBe('fixed');
    expect(styles.zIndex).toBe('100');
    expect(styles.top).toBe('0');
    expect(styles.boxShadow).toBe('0 5px 20px -10px #000');
    expect(styles.marginBottom).toBe('2px');
  });
});
