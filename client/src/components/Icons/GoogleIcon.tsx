type IconProps = {
  readonly ariaHidden?: boolean;
  readonly focusable?: boolean;
};

export const GoogleIcon = ({
  ariaHidden = false,
  focusable = true,
}: IconProps) => {
  return (
    <svg
      aria-hidden={ariaHidden}
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      focusable={focusable}
      viewBox="0 0 46 46"
    >
      <path
        d="M23 8.9a12.75 12.75 0 0 1 8.9 3.4L38.37 6A22.1 22.1 0 0 0 23 0 23 23 0 0 0 2.45 12.68l7.44 5.78A13.9 13.9 0 0 1 23 8.9z"
        fill="#ea4335"
      />
      <path
        d="M45.08 23.5a19.7 19.7 0 0 0-.5-4.7H23v8.55h12.68A11.24 11.24 0 0 1 31 34.8l7.26 5.63c4.34-4 6.85-9.92 6.85-16.92z"
        fill="#4285f4"
      />
      <path
        d="M9.92 27.55A14.16 14.16 0 0 1 9.15 23a14.88 14.88 0 0 1 .74-4.55l-7.45-5.77a23 23 0 0 0 0 20.65l7.46-5.78z"
        fill="#fbbc05"
      />
      <path
        d="M23 46a21.92 21.92 0 0 0 15.23-5.57L31 34.8a13.6 13.6 0 0 1-8 2.3 13.85 13.85 0 0 1-13.08-9.55l-7.44 5.77A22.94 22.94 0 0 0 23 46z"
        fill="#34a853"
      />
      <path
        d="M0 0h46v46H0V0z"
        fill="none"
      />
    </svg>
  );
};
