/**
 * Shared authentication types and constants
 */

export const SocialProviders = {
  AMAZON: 'Amazon',
  APPLE: 'Apple',
  FACEBOOK: 'Facebook',
  GOOGLE: 'Google',
} as const satisfies Record<string, string>;

export type SocialProvider =
  (typeof SocialProviders)[keyof typeof SocialProviders];
