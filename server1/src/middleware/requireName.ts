import { VALIDATION_LIMITS } from '../utils/constants.js';

import { createValidator } from './createValidator.js';

export const requireName = createValidator({
  paramName: 'name',
  validate: (value) => {
    if (!value?.trim()) {
      return { errorMessage: 'Name is required', isValid: false };
    }

    if (value.length > VALIDATION_LIMITS.MAX_NAME_LENGTH) {
      return {
        errorMessage: `Name must not exceed ${VALIDATION_LIMITS.MAX_NAME_LENGTH} characters`,
        isValid: false,
      };
    }

    return { isValid: true };
  },
});
