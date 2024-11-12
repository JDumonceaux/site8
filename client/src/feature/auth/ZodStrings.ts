import {
  AUTH_CODE_LENGTH,
  AUTH_ERROR_MESSAGES,
  MAX_EMAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  REQUIRED_FIELD,
} from 'lib/utils/constants';
import { z } from 'zod';

export const emailAddress: z.ZodString = z
  .string({
    invalid_type_error: AUTH_ERROR_MESSAGES.emailInvalidType,
    required_error: AUTH_ERROR_MESSAGES.emailRequired,
  })
  .min(1, REQUIRED_FIELD)
  .max(MAX_EMAIL_LENGTH)
  .trim();

export const password: z.ZodString = z
  .string({
    invalid_type_error: AUTH_ERROR_MESSAGES.passwordInvalidType,
    required_error: AUTH_ERROR_MESSAGES.passwordRequired,
  })
  .min(MIN_PASSWORD_LENGTH, REQUIRED_FIELD)
  .max(
    MAX_PASSWORD_LENGTH,
    `${AUTH_ERROR_MESSAGES.maxLengthExceeded} ${MAX_PASSWORD_LENGTH}`,
  )
  .trim();

export const authCode: z.ZodString = z
  .string({
    invalid_type_error: AUTH_ERROR_MESSAGES.authCodeInvalidType,
    required_error: AUTH_ERROR_MESSAGES.authCodeRequired,
  })
  .min(AUTH_CODE_LENGTH, REQUIRED_FIELD)
  .max(AUTH_CODE_LENGTH)
  .trim();
