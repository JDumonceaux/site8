import type { IconProps } from './types';

export const AddIcon = ({
  isAriaHidden = false,
  isFocusable = true,
}: IconProps) => {
  return (
    <svg
      aria-hidden={isAriaHidden}
      fill="currentColor"
      focusable={isFocusable}
      height="22px"
      viewBox="0 0 24 24"
      width="22px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
};

AddIcon.displayName = 'AddIcon';
