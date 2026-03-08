import { createValidator } from './createValidator.js';

export const requireNumericId = createValidator({
  paramName: 'id',
  validate: (value) => {
    if (!value.trim()) {
      return { errorMessage: 'Id is required', isValid: false };
    }

    const numericId = Number(value);

    if (isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
      return {
        errorMessage: 'Id must be a positive integer',
        isValid: false,
      };
    }

    return { isValid: true };
  },
});
