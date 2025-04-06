import { isAxiosError, isCancel } from 'axios';

export const httpErrorHandler = (error: unknown): null | string => {
  // Return null for cancelled requests
  if (isCancel(error)) {
    return null;
  }

  // Handle Axios errors
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    // If status is undefined, return the error message
    if (!status) {
      return error.message;
    }

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
        return `Server error: ${data}`;
      }
      default: {
        return `Unknown error ${status}`;
      }
    }
  }

  // Handle other errors (e.g. errors thrown in setting up the request)
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback message for unrecognized errors
  return 'Unknown error ...';
};

export const handleQueryError = (res: Response): null | string => {
  if (res.ok) {
    return null;
  }

  switch (res.status) {
    case 401: {
      return 'Please login.';
    }
    case 404: {
      throw new Error(`Error: Resource not found (404)`);
    }
    case 408: {
      throw new Error(`Error: Request timeout`);
    }
    case 500: {
      throw new Error(`Error: ${res.statusText}`);
    }
    default: {
      return `Unknown error ${res.status}`;
    }
  }
};
