import { IconVisibility } from 'components/ui/Icons/IconVisibility';
import { IconVisibilityOff } from 'components/ui/Icons/IconVisibilityOff';
import { styled } from 'styled-components';

type ShowPasswordButtonProps = {
  readonly type: 'password' | 'text';
  readonly passwordIsHiddenLabel?: string;
  readonly passwordIsShownLabel?: string;
  readonly showPasswordButtonLabel?: string;
  readonly hasError?: boolean;
  readonly ref?: React.Ref<HTMLButtonElement>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export const ShowPasswordButton = ({
  type,
  passwordIsHiddenLabel = 'Password is hidden',
  passwordIsShownLabel = 'Password is shown',
  showPasswordButtonLabel = 'Show password',
  hasError = false,
  ref,
  ...rest
}: ShowPasswordButtonProps) => {
  const icon =
    type === 'password' ? (
      <IconVisibility aria-hidden="true" />
    ) : (
      <IconVisibilityOff aria-hidden="true" />
    );

  return (
    <StyledButton
      $hasError={hasError}
      aria-checked={type !== 'password'}
      aria-label={showPasswordButtonLabel}
      ref={ref}
      role="switch"
      type="button"
      {...rest}>
      <HiddenSpan aria-live="polite">
        {type === 'password' ? passwordIsHiddenLabel : passwordIsShownLabel}
      </HiddenSpan>
      {icon}
    </StyledButton>
  );
};

export default ShowPasswordButton;

ShowPasswordButton.displayName = 'ShowPasswordButton';

const HiddenSpan = styled.span`
  display: none;
`;
const StyledButton = styled.button<{ $hasError: boolean }>`
  color: ${(props) => (props.$hasError ? '#212121' : '#ff0000')};
`;
