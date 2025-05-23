// LoadingWrapper.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { AxeResults } from 'axe-core';

import LoadingWrapper from './LoadingWrapper';

expect.extend(toHaveNoViolations);

describe('loadingWrapper Component', () => {
  it('renders children when no state flags are set', () => {
    expect.assertions(1);

    render(
      <LoadingWrapper>
        <div data-testid="child">Content</div>
      </LoadingWrapper>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('displays saving state with progress bar and text', () => {
    expect.assertions(3);

    render(
      <LoadingWrapper isSaving>
        <div>Child</div>
      </LoadingWrapper>,
    );

    expect(screen.getByText(/Saving…/i)).toBeInTheDocument();

    const progress = screen.getByRole('progressbar');

    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute('aria-valuetext', 'Saving…');
  });

  it('displays loading state with custom text and fallback', () => {
    expect.assertions(2);

    render(
      <LoadingWrapper
        isLoading
        loadingText="Please wait"
        fallback={<div data-testid="fallback" />}>
        <div>Child</div>
      </LoadingWrapper>,
    );

    expect(screen.getByText('Please wait')).toBeInTheDocument();
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });

  it('handles string error and still renders children', () => {
    expect.assertions(2);

    render(
      <LoadingWrapper error="Oops">
        <div data-testid="child" />
      </LoadingWrapper>,
    );

    expect(screen.getByText('Oops')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('handles Error instance and displays its message', () => {
    expect.assertions(1);

    render(
      <LoadingWrapper error={new Error('Fail')}>
        <div />
      </LoadingWrapper>,
    );

    expect(screen.getByText('Fail')).toBeInTheDocument();
  });

  it('handles unknown error types gracefully', () => {
    expect.assertions(1);

    render(
      <LoadingWrapper error={{ code: 123 } as unknown}>
        <div />
      </LoadingWrapper>,
    );

    expect(screen.getByText('An unknown error occurred.')).toBeInTheDocument();
  });

  it('applies correct animation style to ProgressBar', () => {
    expect.assertions(1);

    const { container } = render(
      <LoadingWrapper isLoading children={undefined} />,
    );
    const bar = container.querySelector('div');

    expect(bar).toHaveStyle('animation: 2s infinite linear');
  });

  it('has no a11y violations in default state', async () => {
    expect.hasAssertions();

    const { container } = render(
      <LoadingWrapper>
        <div>Content</div>
      </LoadingWrapper>,
    );
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('has no a11y violations during loading', async () => {
    expect.hasAssertions();

    const { container } = render(
      <LoadingWrapper isLoading>
        <div />
      </LoadingWrapper>,
    );
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('has no a11y violations when error occurs', async () => {
    expect.hasAssertions();

    const { container } = render(
      <LoadingWrapper error="Err">
        <div />
      </LoadingWrapper>,
    );
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
