import { isAxiosError, isCancel } from 'axios';

/**
 * Handles HTTP errors and returns corresponding error messages.
 *
 * @param error - The error object to handle.
 * @returns The error message based on the type of error.
 * @throws Error if the error is null.
 */
export const httpErrorHandler = (error: unknown): null | string => {
  if (isCancel(error)) {
    return null;
  }

  if (!isAxiosError(error) || !(error instanceof Error)) {
    return null;
  }

  if (isAxiosError(error)) {
    const { status } = error;

    console.log('error', error);

    switch (status) {
      case 401: {
        return 'Please login.';
      }
      case 404: {
        return 'Request failed with 404 (not found).';
      }
      case 408: {
        return 'Request timed out.';
      }
      case 500: {
        return 'Server error: ';
      }
      // case 'ERR_CANCELLED': {
      //   return 'Request cancelled.';
      // }
      // case 'ERR_NETWORK': {
      //   return 'Connection problems.';
      // }
      default: {
        return `Unknown error ${status}`;
      }
    }
  }
  // Something happened in setting up the request and triggered an Error
  return 'Unknown error ...';
};
