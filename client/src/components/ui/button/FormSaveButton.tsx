import type { JSX } from 'react';
import { useFormStatus } from 'react-dom';

import StyledPlainButton from '@components/ui/link/styled-plain-button/StyledPlainButton';

type FormSaveButtonProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly form?: string;
  readonly isDisabled?: boolean;
};

/**
 * Form save button that uses React 19's useFormStatus hook
 * to automatically disable during form submission.
 * Must be used inside a <form> element or reference a form via the form prop.
 */
const FormSaveButton = ({
  children = 'Save',
  className,
  'data-testid': dataTestId,
  form,
  isDisabled = false,
}: FormSaveButtonProps): JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <StyledPlainButton
      className={className}
      data-testid={dataTestId}
      disabled={isDisabled || pending}
      form={form}
      type="submit"
    >
      {children}
    </StyledPlainButton>
  );
};

FormSaveButton.displayName = 'FormSaveButton';
export default FormSaveButton;
