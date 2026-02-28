// Allowed visual variants for Button
export const VARIANTS = ['discreet', 'ghost', 'secondary', 'primary'] as const;
export type Variant = (typeof VARIANTS)[number];

// Allowed size options for Button
export const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Size = (typeof SIZES)[number];
