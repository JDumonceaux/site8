import { getUserFriendlyErrorMessage } from './errorHandler';

describe('getUserFriendlyErrorMessage', () => {
  test('returns network message for network-related errors', () => {
    expect.hasAssertions();

    const error = new Error('network');
    const errorMessage = getUserFriendlyErrorMessage(error);

    expect(errorMessage).toBe(
      'Network connection issue. Please check your internet connection and try again.',
    );
  });

  test('returns timeout message for timeout errors', () => {
    expect.hasAssertions();

    const error = new Error('timeout');
    const errorMessage = getUserFriendlyErrorMessage(error);

    expect(errorMessage).toBe('Request timed out. Please try again.');
  });

  test('returns not-found message for 404-like errors', () => {
    expect.hasAssertions();

    const error = new Error('404');
    const errorMessage = getUserFriendlyErrorMessage(error);

    expect(errorMessage).toBe('The requested resource was not found.');
  });

  test('returns session-expired message for 401-like errors', () => {
    expect.hasAssertions();

    const error = new Error('401 unauthorized');
    const errorMessage = getUserFriendlyErrorMessage(error);

    expect(errorMessage).toBe('Your session has expired. Please log in again.');
  });

  test('returns generic fallback for unknown non-Error shapes', () => {
    expect.hasAssertions();

    // Non-Error shapes should fall back to generic message
    const error: unknown = {};
    const errorMessage = getUserFriendlyErrorMessage(error);

    expect(errorMessage).toBe(
      'An unexpected error occurred. Please try again or contact support if the problem persists.',
    );
  });
});
