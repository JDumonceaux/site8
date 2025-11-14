import { httpErrorHandler } from './errorHandler';

describe('httpErrorHandler', () => {
  test('should return "Connection problems.." for ERR_NETWORK error', () => {
    expect.hasAssertions();

    const error = { code: 'ERR_NETWORK' };
    const errorMessage = httpErrorHandler(error);

    expect(errorMessage).toBe('Connection problems..');
  });

  test('should return "Connection cancelled.." for ERR_CANCELED error', () => {
    expect.hasAssertions();

    const error = { code: 'ERR_CANCELED' };
    const errorMessage = httpErrorHandler(error);

    expect(errorMessage).toBe('Connection cancelled..');
  });

  test('should return "Request timed out" for 408 status code', () => {
    expect.hasAssertions();

    const error = { response: { status: 408 } };
    const errorMessage = httpErrorHandler(error);

    expect(errorMessage).toBe('Request timed out');
  });

  test('should return "The requested resource does not exist or has been deleted" for 404 status code', () => {
    expect.hasAssertions();

    const error = { response: { status: 404 } };
    const errorMessage = httpErrorHandler(error);

    expect(errorMessage).toBe(
      'The requested resource does not exist or has been deleted',
    );
  });

  test('should return "Please login to access this resource" for 401 status code', () => {
    expect.hasAssertions();

    const error = { response: { status: 401 } };
    const errorMessage = httpErrorHandler(error);

    expect(errorMessage).toBe('Please login to access this resource');
  });

  test('should return "No response received from the server" for request without response', () => {
    expect.hasAssertions();

    const error = { request: {} };
    const errorMessage = httpErrorHandler(error);

    expect(errorMessage).toBe('No response received from the server');
  });

  test('should return "Unknown error occurred.." for unknown errors', () => {
    expect.hasAssertions();

    const error = {};
    const errorMessage = httpErrorHandler(error);

    expect(errorMessage).toBe('Unknown error occurred..');
  });
});
