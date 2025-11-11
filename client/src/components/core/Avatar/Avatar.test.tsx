// Avatar.test.tsx
import { render, screen } from '@testing-library/react';

import type { AxeResults } from 'axe-core';
import { configureAxe } from 'jest-axe';
import Avatar from './Avatar';
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';

const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components
    region: { enabled: false },
  },
});

describe('avatar Component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('renders initials fallback when no src or children provided', () => {
    expect.assertions(2);

    render(
      <Avatar
        alt="Jane Doe"
        dataTestId="avatar"
      />,
    );
    const root = screen.getByTestId('avatar');

    expect(root).toBeInTheDocument();

    // Fallback shows initials "JD"
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  test('renders custom children instead of initials', () => {
    expect.assertions(1);

    render(
      <Avatar dataTestId="avatar">
        <span>👤</span>
      </Avatar>,
    );

    expect(screen.getByText('👤')).toBeInTheDocument();
  });

  test('renders image when src provided, and respects alt text', () => {
    expect.assertions(3);

    const url = 'https://example.com/avatar.png';
    render(
      <Avatar
        alt="User Avatar"
        dataTestId="avatar"
        src={url}
      />,
    );

    // The <img> should appear with correct alt and src
    const img = screen.getByRole('img', { name: 'User Avatar' });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', url);

    // Fallback should not be in the document
    expect(screen.queryByText(/^[A-Z]{1,2}$/)).toBeNull();
  });

  test('applies correct size styling', () => {
    expect.assertions(1);

    render(
      <Avatar
        dataTestId="avatar"
        size={80}
      />,
    );
    const root = screen.getByTestId('avatar');

    // The container should have 80px width and height
    expect(root).toHaveStyle({ height: '80px', width: '80px' });
  });

  test('does not show fallback until after delayMs', async () => {
    expect.assertions(2);

    render(
      <Avatar
        alt="John Smith"
        dataTestId="avatar"
        delayMs={1000}
      />,
    );

    // Immediately after render, fallback is not yet visible
    expect(screen.queryByText('JS')).toBeNull();

    // Advance timers past the delay
    jest.advanceTimersByTime(1000);

    // Wait for the fallback to appear
    const fallback = await screen.findByText('JS');

    expect(fallback).toBeInTheDocument();
  });

  test('has no accessibility violations', async () => {
    expect.hasAssertions();

    const { container } = render(
      <Avatar
        alt="A11y Test"
        dataTestId="avatar"
      />,
    );
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
