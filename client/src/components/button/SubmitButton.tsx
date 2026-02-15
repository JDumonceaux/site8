import type { JSX } from 'react';
import { useFormStatus } from 'react-dom';

import Button from './Button';
import type { Variant } from './Button';

type SubmitButtonProps = {
  readonly children?: React.ReactNode;
  readonly id?: string;
  readonly isDisabled?: boolean;
  readonly loadingText?: string;
  readonly variant?: Variant;
};

/**
 * Submit button component that uses React 19's useFormStatus hook
 * to automatically show loading state during form submission.
 * Must be used inside a <form> element.
 */
const SubmitButton = ({
  children = 'Submit',
  id,
  isDisabled = false,
  loadingText = 'Processing',
  variant = 'primary',
}: SubmitButtonProps): JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={isDisabled || pending}
      id={id}
      type="submit"
      variant={variant}
    >
      {pending ? loadingText : children}
    </Button>
  );
};

SubmitButton.displayName = 'SubmitButton';
export default SubmitButton;
