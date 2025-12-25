import { createValidator } from './createValidator.js';

export const requireId = createValidator({
  paramName: 'id',
  validate: (value) => {
    if (typeof value !== 'string' || value.trim() === '') {
      return { isValid: false, errorMessage: 'Id is required' };
    }
    return { isValid: true };
  },
});
