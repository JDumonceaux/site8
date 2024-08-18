import { AxiosError, isAxiosError } from 'axios';

/**
 * Handles HTTP errors and returns corresponding error messages.
 *
 * @param error - The error object to handle.
 * @returns The error message based on the type of error.
 * @throws Error if the error is null.
 */
export const httpErrorHandler = (
  error: AxiosError | null | unknown,
): string => {
  if (error === null) throw new Error('Unrecoverable error!! Error is null!');

  if (isAxiosError(error)) {
    const { code, request, response } = error;

    if (code === 'ERR_NETWORK') {
      return 'Connection problems..';
    } else if (code === 'ERR_CANCELED') {
      return 'Connection cancelled..';
    }

    if (response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status } = response;
      switch (status) {
        case 401: {
          return 'Please login to access this resource';
        }
        case 404: {
          return 'The requested resource does not exist or has been deleted';
        }
        case 408: {
          return 'Request timed out';
        }
        default: {
          return 'Unknown error occurred...';
        }
      }
    } else if (request) {
      // The request was made but no response was received
      return 'No response received from the server';
    }
  }

  // Log unknown errors for debugging
  console.error('Unhandled error:', error);

  // Something happened in setting up the request and triggered an Error
  return 'Unknown error occurred..';
};
