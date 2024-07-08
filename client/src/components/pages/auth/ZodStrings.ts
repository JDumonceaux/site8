import { REQUIRED_FIELD } from 'utils';
import { z } from 'zod';

export const emailAddress: z.ZodString = z
  .string({
    required_error: 'eMail Address is required.',
    invalid_type_error: 'eMail Address must be a string',
  })
  .min(1, REQUIRED_FIELD)
  .max(250)
  .trim();

export const password: z.ZodString = z
  .string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string',
  })
  .min(8, REQUIRED_FIELD)
  .max(60, 'Max length exceeded: 60')
  .trim();

export const authCode: z.ZodString = z
  .string({
    required_error: 'Code is required.',
    invalid_type_error: 'Code must be a number',
  })
  .min(6, REQUIRED_FIELD)
  .max(6)
  .trim();
