import { render, screen } from '@testing-library/react';

import LoadingWrapper from './LoadingWrapper';

describe('LoadingWrapper', () => {
  test('renders children when isLoading is false', () => {
    render(
      <LoadingWrapper error={null} isLoading={false}>
        <div>Child Component</div>
      </LoadingWrapper>,
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('renders loading text when isLoading is true', () => {
    render(
      <LoadingWrapper error={null} isLoading={true} loadingText="Loading...">
        <div>Child Component</div>
      </LoadingWrapper>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders fallback when isLoading is true and loadingText is not provided', () => {
    render(
      <LoadingWrapper
        error={null}
        fallback={<div>Loading...</div>}
        isLoading={true}>
        <div>Child Component</div>
      </LoadingWrapper>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message when error is provided', () => {
    render(
      <LoadingWrapper error="Error occurred" isLoading={false}>
        <div>Child Component</div>
      </LoadingWrapper>,
    );
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
