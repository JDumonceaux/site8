// Allowed visual variants for Dialog
export const VARIANTS = {
  default: 'default',
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning',
} as const;
export type Variant = keyof typeof VARIANTS;

// Allowed size options for Dialog
export const SIZES = {
  lg: 'lg',
  md: 'md',
  sm: 'sm',
} as const;
export type Size = keyof typeof SIZES;
