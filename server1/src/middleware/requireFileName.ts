import { createValidator } from './createValidator.js';

export const requireFileName = createValidator({
  paramName: 'filename',
  validate: (value) => {
    if (!value) {
      return { isValid: false, errorMessage: 'File name is required' };
    }
    return { isValid: true };
  },
});
