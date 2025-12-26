export const httpErrorHandler = (error: unknown): null | string => {
  // Handle standard errors
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
