/**
 * Shared authentication types and constants
 */

export const SocialProvider = {
  AMAZON: 'Amazon',
  APPLE: 'Apple',
  FACEBOOK: 'Facebook',
  GOOGLE: 'Google',
} as const satisfies Record<string, string>;

export type SocialProvider =
  (typeof SocialProvider)[keyof typeof SocialProvider];
