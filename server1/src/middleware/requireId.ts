import { createValidator } from './createValidator.js';

export const requireId = createValidator({
  paramName: 'id',
  validate: (value) => {
    if (typeof value !== 'string' || value.trim() === '') {
      return { errorMessage: 'Id is required', isValid: false };
    }
    return { isValid: true };
  },
});
