import { IconVisibility } from 'components/icons/IconVisibility';
import { IconVisibilityOff } from 'components/icons/IconVisibilityOff';
import { styled } from 'styled-components';

type ShowPasswordButtonProps = {
  readonly hasError?: boolean;
  readonly passwordIsHiddenLabel?: string;
  readonly passwordIsShownLabel?: string;
  readonly ref?: React.Ref<HTMLButtonElement>;
  readonly showPasswordButtonLabel?: string;
  readonly type: 'password' | 'text';
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export const ShowPasswordButton = ({
  hasError = false,
  passwordIsHiddenLabel = 'Password is hidden',
  passwordIsShownLabel = 'Password is shown',
  ref,
  showPasswordButtonLabel = 'Show password',
  type,
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
