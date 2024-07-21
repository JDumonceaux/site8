import { httpErrorHandler } from './errorHandler';

describe('httpErrorHandler', () => {
  it('should return "Connection problems.." for ERR_NETWORK error', () => {
    const error = { code: 'ERR_NETWORK' };
    const errorMessage = httpErrorHandler(error);
    expect(errorMessage).toBe('Connection problems..');
  });

  it('should return "Connection cancelled.." for ERR_CANCELED error', () => {
    const error = { code: 'ERR_CANCELED' };
    const errorMessage = httpErrorHandler(error);
    expect(errorMessage).toBe('Connection cancelled..');
  });

  it('should return "Request timed out" for 408 status code', () => {
    const error = { response: { status: 408 } };
    const errorMessage = httpErrorHandler(error);
    expect(errorMessage).toBe('Request timed out');
  });

  it('should return "The requested resource does not exist or has been deleted" for 404 status code', () => {
    const error = { response: { status: 404 } };
    const errorMessage = httpErrorHandler(error);
    expect(errorMessage).toBe(
      'The requested resource does not exist or has been deleted',
    );
  });

  it('should return "Please login to access this resource" for 401 status code', () => {
    const error = { response: { status: 401 } };
    const errorMessage = httpErrorHandler(error);
    expect(errorMessage).toBe('Please login to access this resource');
  });

  it('should return "No response received from the server" for request without response', () => {
    const error = { request: {} };
    const errorMessage = httpErrorHandler(error);
    expect(errorMessage).toBe('No response received from the server');
  });

  it('should return "Unknown error occurred.." for unknown errors', () => {
    const error = {};
    const errorMessage = httpErrorHandler(error);
    expect(errorMessage).toBe('Unknown error occurred..');
  });
});
