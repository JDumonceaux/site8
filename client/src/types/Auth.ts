import {
  AUTH_ERROR_MESSAGES,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@lib/utils/constants';
import { z } from 'zod';

// const emailAddress = z
//   .string({
//     error: AUTH_ERROR_MESSAGES.emailInvalidType,
//     message: AUTH_ERROR_MESSAGES.emailRequired,
//   })
//   .min(1, REQUIRED_FIELD)
//   .max(MAX_EMAIL_LENGTH)
//   .trim();

const password = z
  .string({
    error: AUTH_ERROR_MESSAGES.passwordInvalidType,
    message: AUTH_ERROR_MESSAGES.passwordRequired,
  })
  .min(
    MIN_PASSWORD_LENGTH,
    `Must be at least ${MIN_PASSWORD_LENGTH} characters`,
  )
  .max(MAX_PASSWORD_LENGTH, `Cannot exceed ${MAX_PASSWORD_LENGTH} characters`);

export const ChangePasswordSchema = z
  .object({
    confirmPassword: password,
    newPassword: password,
    password: password,
  })
  .refine((x) => x.newPassword === x.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
