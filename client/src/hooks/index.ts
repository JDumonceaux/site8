/**
 * Centralized hooks module
 * Provides all custom hooks with consistent exports
 */

export { useApiRequest } from './api/useApiRequest';
// Example Hooks (for reference/learning)
export { default as usePageVisibility } from './examples/usePageVisibility';

export { default as useScroll } from './examples/useScroll';
export { default as useTheme } from './examples/useTheme';

export { default as useViewport } from './examples/useViewport';
// Async Operation Hooks
export { useAsyncOperation } from './useAsyncOperation';

export { useDependencyDebugger } from './useDependencyDebugger';

// Form Management Hooks
export { default as useForm } from './useForm';
export { default as useFormArray } from './useFormArray';
// Utility Hooks
export { default as useGetId } from './useGetId';
// Feature-Specific Hooks
export { default as useMenuAdd } from './useMenuAdd';
