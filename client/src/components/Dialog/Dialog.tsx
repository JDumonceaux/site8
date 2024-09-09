import React, {
  ButtonHTMLAttributes,
  DialogHTMLAttributes,
  memo,
  useLayoutEffect,
  useRef,
} from 'react';
import styled, { css, keyframes } from 'styled-components';

const VARIANTS = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  default: 'default',
};

const SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

type DialogProps = {
  readonly label: React.ReactNode;
  readonly isOpen: boolean;
  readonly isModal?: boolean;
  readonly isAutofocusClose?: boolean;
  readonly children: React.ReactNode;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
  readonly footer?: React.ReactNode;
  readonly buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  readonly labelProps?: React.HTMLAttributes<HTMLLabelElement>;
  readonly onClose: () => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

const getIcon = (variant: keyof typeof VARIANTS) => {
  switch (variant) {
    case VARIANTS.info:
      return (
        <StyledIcon
          $variant={variant}
          className="fa-solid fa-circle-exclamation"
        />
      );
    case VARIANTS.success:
      return (
        <StyledIcon $variant={variant} className="fa-solid fa-circle-check" />
      );
    case VARIANTS.warning:
      return (
        <StyledIcon
          $variant={variant}
          className="fa-solid fa-triangle-exclamation"
        />
      );
    case VARIANTS.error:
      return (
        <StyledIcon $variant={variant} className="fa-solid fa-circle-xmark" />
      );
    case VARIANTS.default:
    default:
      return null;
  }
};

const Dialog = ({
  label,
  isOpen,
  isModal = true,
  isAutofocusClose = true,
  children,
  size = 'md',
  variant = 'default',
  footer,
  buttonProps,
  labelProps,
  onClose,
  ...rest
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const { current: el } = dialogRef;
    if (isOpen && el !== null) {
      isModal ? el.showModal() : el.show();
    } else if (el !== null) {
      el.close();
    }
  }, [isOpen]);

  return (
    <StyledDialog
      ref={dialogRef}
      data-testid="Dialog"
      role="dialog"
      aria-labelledby="label"
      {...rest}
      $variant={variant}
      $size={size}>
      <Content>
        <div>
          <LabelRow>
            {getIcon(variant)}
            <StyledLabel id="label" {...labelProps} htmlFor="contents">
              {label}
            </StyledLabel>
          </LabelRow>
          <div id="contents">{children}</div>
        </div>
        <Footer>{footer}</Footer>
      </Content>
      <CloseButton
        onClick={onClose}
        autoFocus={isAutofocusClose}
        aria-label={buttonProps?.['aria-label']}>
        X
      </CloseButton>
    </StyledDialog>
  );
};

Dialog.displayName = 'Dialog';

export default memo(Dialog);

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
    display: none;
  }
  to {
    opacity: 1;
    transform: scaleY(1);
    display: block;
  }
`;

const StyledDialog = styled.dialog<{
  $variant?: keyof typeof VARIANTS;
  $size?: keyof typeof SIZES;
}>`
  all: revert;
  box-sizing: border-box;
  border: unset;
  ${(props) => {
    switch (props.$variant) {
      case VARIANTS.info:
        return css`
          bordertop: 8px solid #0052ff;
        `;
      case VARIANTS.success:
        return css`
          bordertop: 8px solid #21a67a;
        `;
      case VARIANTS.warning:
        return css`
          bordertop: 8px solid #ff000f;
        `;
      case VARIANTS.error:
        return css`
          bordertop: 8px solid #ef3934;
        `;
      case VARIANTS.default:
      default:
        return css`
          bordertop: 8px solid #000000;
        `;
    }
  }}
  ${(props) => {
    switch (props.$size) {
      case SIZES.sm:
        return css`
          max-width: 320px;
        `;
      case SIZES.md:
        return css`
          max-width: 480px;
        `;
      case SIZES.lg:
        return css`
          max-width: 640px;
        `;
      default:
        return css`
          max-width: 480px;
        `;
    }
  }}
  border-radius: 10px;
  outline: none;
  overflow-x: hidden;
  min-height: 50dvh;
  min-width: 320px;
  width: calc(100% - 32px);
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
  [open] {
    animation: fadeIn 0.7s ease-out;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 90%;
  div:first-child {
    flex: 1;
  }
  width: calc(100% - 32px);
`;

const LabelRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
`;

const CloseButton = styled.button`
  font-size: 24px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Footer = styled.div`
  flex-shrink: 0;
`;

const StyledIcon = styled.i<{
  $variant?: keyof typeof VARIANTS;
}>`
  font-size: 24px;
  margin-right: 8px;
  ${(props) => {
    switch (props.$variant) {
      case VARIANTS.info:
        return css`
          color: #0052ff;
        `;
      case VARIANTS.success:
        return css`
          color: #21a67a;
        `;
      case VARIANTS.warning:
        return css`
          color: #ff000f;
        `;
      case VARIANTS.error:
        return css`
          color: #ef3934;
        `;
      case VARIANTS.default:
      default:
        return css`
          color: #ffffff;
        `;
    }
  }}
`;
