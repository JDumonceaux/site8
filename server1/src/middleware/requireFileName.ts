import { createValidator } from './createValidator.js';

export const requireFileName = createValidator({
  paramName: 'filename',
  validate: (value) => {
    if (!value) {
      return { errorMessage: 'File name is required', isValid: false };
    }
    return { isValid: true };
  },
});
