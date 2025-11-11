// Header.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';

import { APP_NAME } from '@lib/utils/constants';
import { configureAxe } from 'jest-axe';
import Header from './Header';
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';

const axe = configureAxe();

describe('header component', () => {
  test('renders skip link targeting #main-content', () => {
    expect.assertions(2);

    render(<Header />);
    const skipLink = screen.getByText('Skip to main content');

    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('renders logo linking to "/" with app name', () => {
    expect.assertions(2);

    render(<Header />);
    const logoLink = screen.getByRole('link', { name: `${APP_NAME} Home` });

    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('menu button appears only when onMenuToggle is provided and fires callback', () => {
    expect.assertions(2);

    const toggleMock = jest.fn();
    render(<Header onMenuToggle={toggleMock} />);
    const menuButton = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    });

    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  test('menu button is absent when onMenuToggle is not provided', () => {
    expect.assertions(1);

    render(<Header />);
    const button = screen.queryByRole('button', {
      name: /toggle navigation menu/i,
    });

    expect(button).toBeNull();
  });

  test('renders avatar slot when provided', () => {
    expect.assertions(1);

    render(<Header avatar={<div data-testid="avatar-slot">UserAvatar</div>} />);

    expect(screen.getByTestId('avatar-slot')).toHaveTextContent('UserAvatar');
  });

  test('has no detectable accessibility violations', async () => {
    expect.assertions(1);

    const { container } = render(
      <>
        {/* Provide a target for skip link to avoid broken-link a11y */}
        <div id="main-content" />
        <Header />
      </>,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
