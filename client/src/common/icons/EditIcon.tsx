import type { IconProps } from './types';

export const EditIcon = ({
  isAriaHidden = false,
  isFocusable = true,
}: IconProps) => {
  return (
    <svg
      aria-hidden={isAriaHidden}
      fill="none"
      focusable={isFocusable}
      height="22px"
      viewBox="0 0 24 24"
      width="22px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3785 8.44975L11.4637 15.3647C11.1845 15.6439 10.8289 15.8342 10.4417 15.9117L7.49994 16.5L8.08829 13.5582C8.16572 13.1711 8.35603 12.8155 8.63522 12.5363L15.5501 5.62132C16.3311 4.84027 17.5975 4.84027 18.3785 5.62132C19.1596 6.40236 19.1596 7.66871 18.3785 8.44975Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M19 15V18C19 19.1046 18.1046 20 17 20H6C4.89543 20 4 19.1046 4 18V7C4 5.89543 4.89543 5 6 5H9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
