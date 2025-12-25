import { createValidator } from './createValidator.js';

const MAX_NAME_LENGTH = 255;

export const requireName = createValidator({
  paramName: 'name',
  validate: (value) => {
    if (!value?.trim()) {
      return { isValid: false, errorMessage: 'Name is required' };
    }

    if (value.length > MAX_NAME_LENGTH) {
      return {
        isValid: false,
        errorMessage: `Name must not exceed ${MAX_NAME_LENGTH} characters`,
      };
    }

    return { isValid: true };
  },
});
