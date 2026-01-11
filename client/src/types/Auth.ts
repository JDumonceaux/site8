import {
  AUTH_ERROR_MESSAGES,
  MAX_EMAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  REQUIRED_FIELD,
} from '@lib/utils/constants';
import * as v from 'valibot';

export const deleteCode = v.pipe(
  v.string(),
  v.minLength(1, 'Required'),
  v.check(
    (value) => value.toLowerCase() === 'delete',
    "Please enter 'delete' to confirm",
  ),
);

export const emailAddress = v.pipe(
  v.string(AUTH_ERROR_MESSAGES.emailRequired),
  v.minLength(1, REQUIRED_FIELD),
  v.maxLength(MAX_EMAIL_LENGTH),
  v.trim(),
);

export const password = v.pipe(
  v.string(AUTH_ERROR_MESSAGES.passwordRequired),
  v.minLength(
    MIN_PASSWORD_LENGTH,
    `Must be at least ${MIN_PASSWORD_LENGTH} characters`,
  ),
  v.maxLength(
    MAX_PASSWORD_LENGTH,
    `Cannot exceed ${MAX_PASSWORD_LENGTH} characters`,
  ),
);

export const SignInSchema = v.object({
  emailAddress,
  password,
});

export const ChangePasswordSchema = v.pipe(
  v.object({
    confirmPassword: password,
    newPassword: password,
    password: password,
  }),
  v.check((x) => x.newPassword === x.confirmPassword, 'Passwords do not match'),
);

export type ChangePassword = v.InferOutput<typeof ChangePasswordSchema>;
export type Password = v.InferOutput<typeof password>;
export type EmailAddress = v.InferOutput<typeof emailAddress>;
export type DeleteCode = v.InferOutput<typeof deleteCode>;
export type SignIn = {
  emailAddress: EmailAddress;
  password: Password;
};
