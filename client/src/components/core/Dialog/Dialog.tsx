/* eslint-disable jsx-a11y/prefer-tag-over-role */
/* eslint-disable react/forbid-component-props */
import {
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type DialogHTMLAttributes,
} from 'react';

import * as DialogUI from '@radix-ui/react-dialog';
import styled, { css, keyframes } from 'styled-components';

// Move
// Resize
// Scroll
const VARIANTS = Object.freeze({
  default: 'default',
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning',
} as const);

const SIZES = Object.freeze({
  lg: 'lg',
  md: 'md',
  sm: 'sm',
} as const);

type DialogProps = {
  readonly buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  readonly children: React.ReactNode;
  readonly footer?: React.ReactNode;
  readonly footerProps?: React.HTMLAttributes<HTMLDivElement>;
  readonly isAutofocusClose?: boolean;
  readonly isModal?: boolean;
  readonly isOpen: boolean;
  readonly label: React.ReactNode;
  readonly labelProps?: React.HTMLAttributes<HTMLLabelElement>;
  readonly onClose: () => void;
  readonly size?: keyof typeof SIZES;
  readonly variant?: keyof typeof VARIANTS;
} & DialogHTMLAttributes<HTMLDialogElement>;

const getIcon = (variant: keyof typeof VARIANTS) => {
  switch (variant) {
    case VARIANTS.default: {
      return null;
    }
    case VARIANTS.error: {
      return (
        <StyledIcon $variant={variant} className="fa-solid fa-circle-xmark" />
      );
    }
    case VARIANTS.info: {
      return (
        <StyledIcon
          $variant={variant}
          className="fa-solid fa-circle-exclamation"
        />
      );
    }
    case VARIANTS.success: {
      return (
        <StyledIcon $variant={variant} className="fa-solid fa-circle-check" />
      );
    }
    case VARIANTS.warning: {
      return (
        <StyledIcon
          $variant={variant}
          className="fa-solid fa-triangle-exclamation"
        />
      );
    }
    default: {
      return null;
    }
  }
};

const Dialog = ({
  buttonProps,
  children,
  footer,
  footerProps,
  isAutofocusClose = true,
  isModal = true,
  isOpen,
  label,
  labelProps,
  onClose,
  size = 'md',
  variant = 'default',
  ...rest
}: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const { current: el } = ref;
    if (isOpen && el !== null) {
      isModal ? el.showModal() : el.show();
    } else if (el !== null) {
      el.close();
    }
  }, [isModal, isOpen]);

  // Resize events
  const [drag, setDrag] = useState({
    active: false,
    x: '',
    y: '',
  });

  const startResize = (e) => {
    setDrag({
      active: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const [dims, setDims] = useState({
    h: 200,
    w: 200,
  });

  const resizeFrame = (e) => {
    const { active, x, y } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const yDiff = Math.abs(y - e.clientY);
      const newW = x > e.clientX ? dims.w - xDiff : dims.w + xDiff;
      const newH = y > e.clientY ? dims.h + yDiff : dims.h - yDiff;

      setDrag({ ...drag, x: e.clientX, y: e.clientY });
      setDims({ h: newH, w: newW });
    }
  };

  const stopResize = (e) => {
    setDrag({ ...drag, active: false });
  };

  const boxStyle = {
    height: `${dims.y}px`,
    width: `${dims.x}px`,
  };

  return (
    <DialogUI.Root>
      <StyledDialog
        aria-labelledby="label"
        data-testid="Dialog"
        draggable
        role="dialog"
        {...rest}
        $size={size}
        $variant={variant}>
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
          <Footer {...footerProps}>{footer}</Footer>
        </Content>
        <CloseButton
          aria-label={buttonProps?.['aria-label']}
          autoFocus={isAutofocusClose}
          onClick={onClose}>
          X
        </CloseButton>
      </StyledDialog>
    </DialogUI.Root>
  );
};

Dialog.displayName = 'Dialog';

export default Dialog;

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

const StyledDialog = styled(DialogUI.Portal)<{
  $size?: keyof typeof SIZES;
  $variant?: keyof typeof VARIANTS;
}>`
  all: revert;
  box-sizing: border-box;
  border: unset;
  ${(props) => {
    switch (props.$variant) {
      case VARIANTS.error: {
        return css`
          border-top: 8px solid var(--status-error, #ef3934);
        `;
      }
      case VARIANTS.info: {
        return css`
          border-top: 8px solid var(--status-info, #0052ff);
        `;
      }
      case VARIANTS.success: {
        return css`
          border-top: 8px solid var(--status-success, #21a67a);
        `;
      }
      case VARIANTS.warning: {
        return css`
          border-top: 8px solid var(--status-warning, #ff000f);
        `;
      }
      case VARIANTS.default:
      default: {
        return css`
          border-top: 8px solid var(-text-primary, #1f1f1f);
        `;
      }
    }
  }}
  ${(props) => {
    switch (props.$size) {
      case SIZES.lg: {
        return css`
          max-width: 640px;
        `;
      }
      case SIZES.md: {
        return css`
          max-width: 480px;
        `;
      }
      case SIZES.sm: {
        return css`
          max-width: 320px;
        `;
      }
      default: {
        return css`
          max-width: 480px;
        `;
      }
    }
  }}
  border-radius: 10px;
  outline: none;
  overflow-x: hidden;
  min-height: 50dvh;
  min-width: 320px;
  width: calc(100% - 32px);
  ::backdrop {
    background-color: var(--backdrop, rgba(0, 0, 0, 0.5));
  }
  [open] {
    animation: fadeIn 0.7s ease-out;
  }
`;

const Content = styled(DialogUI.Content)`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 90%;
  div:first-child {
    flex: 1;
  }
  width: calc(100% - 32px);
`;

const LabelRow = styled(DialogUI.Title)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
`;

const CloseButton = styled(DialogUI.Close)`
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
      case VARIANTS.error: {
        return css`
          color: var(--status-error, #ef3934);
        `;
      }
      case VARIANTS.info: {
        return css`
          color: var(--status-info, #0052ff);
        `;
      }
      case VARIANTS.success: {
        return css`
          color: var(--status-info, #21a67a);
        `;
      }
      case VARIANTS.warning: {
        return css`
          color: var(--status-warning, #ff000f);
        `;
      }
      case VARIANTS.default:
      default: {
        return css`
          color: var(-text-primary, #1f1f1f);
        `;
      }
    }
  }}
`;
