import { createValidator } from './createValidator.js';

export const requireNumericId = createValidator({
  paramName: 'id',
  validate: (value) => {
    if (!value?.trim()) {
      return { isValid: false, errorMessage: 'Id is required' };
    }

    const numericId = Number(value);

    if (isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
      return {
        isValid: false,
        errorMessage: 'Id must be a positive integer',
      };
    }

    return { isValid: true };
  },
});
