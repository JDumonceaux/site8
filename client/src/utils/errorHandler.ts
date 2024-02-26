/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from 'axios';

export const httpErrorHandler = (
  error: {
    response: any;
    request: any;
    config: any;
    code: string;
    message: any;
  } | null,
) => {
  if (error === null) throw new Error('Unrecoverable error!! Error is null!');
  if (isAxiosError(error)) {
    //here we have a type guard check, error inside this if will be treated as AxiosError
    const response = error?.response;
    const request = error?.request;

    if (error.code === 'ERR_NETWORK') {
      return 'Connection problems..';
    } else if (error.code === 'ERR_CANCELED') {
      return 'Connection cancelled..';
    }
    if (response) {
      //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
      const statusCode = response?.status;
      if (statusCode === 404) {
        return 'The requested resource does not exist or has been deleted';
      } else if (statusCode === 401) {
        return 'Please login to access this resource';
      }
    } else if (request) {
      //The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
    }
  }
  //Something happened in setting up the request and triggered an Error
  return 'Unknown error occurred..';
};
