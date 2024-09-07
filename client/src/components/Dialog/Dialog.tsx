import React, {
  ButtonHTMLAttributes,
  DialogHTMLAttributes,
  memo,
  useLayoutEffect,
  useRef,
} from 'react';
import styled, { css } from 'styled-components';

type DialogProps = {
  readonly label: React.ReactNode;
  readonly isOpen: boolean;
  readonly children: React.ReactNode;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
  readonly footer?: React.ReactNode;
  readonly buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  readonly labelProps?: React.HTMLAttributes<HTMLLabelElement>;
  readonly onClose: () => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

const Dialog = ({
  label,
  isOpen,
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
      el.showModal();
    }
  }, [isOpen]);

  const getIcon = () => {
    switch (variant) {
      case 'info':
        return (
          <StyledIcon
            variant={variant}
            className="fa-solid fa-circle-exclamation"
          />
        );
      case 'success':
        return (
          <StyledIcon variant={variant} className="fa-solid fa-circle-check" />
        );
      case 'warning':
        return (
          <StyledIcon
            variant={variant}
            className="fa-solid fa-triangle-exclamation"
          />
        );
      case 'error':
        return (
          <StyledIcon variant={variant} className="fa-solid fa-circle-xmark" />
        );
      default:
        return null;
    }
  };

  return (
    <StyledDialog
      ref={dialogRef}
      data-testid="Dialog"
      role="dialog"
      aria-labelledby="label"
      {...rest}
      variant={variant}
      size={size}>
      <Content>
        <div>
          <LabelRow>
            {getIcon()}
            <StyledLabel id="label" {...labelProps} htmlFor="contents">
              {label}
            </StyledLabel>
          </LabelRow>
          <div id="contents">{children}</div>
        </div>
        <Footer>{footer}</Footer>
      </Content>
      <CloseButton onClick={onClose} aria-label={buttonProps?.['aria-label']}>
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

const StyledDialog = styled.dialog<{
  variant?: string;
  size?: string;
}>`
  all: revert;
  box-sizing: border-box;
  border: unset;
  ${(props) => {
    switch (props.variant) {
      case 'info':
        return css`
          bordertop: 8px solid #0052ff;
        `;
      case 'success':
        return css`
          bordertop: 8px solid #21a67a;
        `;
      case 'warning':
        return css`
          bordertop: 8px solid #ff000f;
        `;
      case 'error':
        return css`
          bordertop: 8px solid #ef3934;
        `;
      default:
        return css`
          bordertop: 8px solid #000000;
        `;
    }
  }}
  ${(props) => {
    switch (props.size) {
      case 'sm':
        return css`
          max-width: 320px;
        `;
      case 'md':
        return css`
          max-width: 480px;
        `;
      case 'lg':
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
  variant?: string;
}>`
  font-size: 24px;
  margin-right: 8px;
  ${(props) => {
    switch (props.variant) {
      case 'info':
        return css`
          color: #0052ff;
        `;
      case 'success':
        return css`
          color: #21a67a;
        `;
      case 'warning':
        return css`
          color: #ff000f;
        `;
      case 'error':
        return css`
          color: #ef3934;
        `;
      default:
        return css`
          color: #ffffff;
        `;
    }
  }}
`;
