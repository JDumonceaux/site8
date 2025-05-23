// Avatar.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Avatar from './Avatar';
import { configureAxe } from 'jest-axe';
import type { AxeResults } from 'axe-core';

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

    render(<Avatar alt="Jane Doe" dataTestId="avatar" />);
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
    render(<Avatar src={url} alt="User Avatar" dataTestId="avatar" />);

    // The <img> should appear with correct alt and src
    const img = screen.getByRole('img', { name: 'User Avatar' });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', url);

    // Fallback should not be in the document
    expect(screen.queryByText(/^[A-Z]{1,2}$/)).toBeNull();
  });

  test('applies correct size styling', () => {
    expect.assertions(1);

    render(<Avatar size={80} dataTestId="avatar" />);
    const root = screen.getByTestId('avatar');

    // The container should have 80px width and height
    expect(root).toHaveStyle({ width: '80px', height: '80px' });
  });

  test('does not show fallback until after delayMs', async () => {
    expect.assertions(2);

    render(<Avatar alt="John Smith" delayMs={1000} dataTestId="avatar" />);

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
      <Avatar alt="A11y Test" dataTestId="avatar" />,
    );
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
