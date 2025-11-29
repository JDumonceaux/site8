import { type JSX, useId } from 'react';

import * as RadixDialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

export const VARIANTS = {
  default: 'default',
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning',
} as const;
export type Variant = keyof typeof VARIANTS;

export const SIZES = {
  lg: 'lg',
  md: 'md',
  sm: 'sm',
} as const;
export type Size = keyof typeof SIZES;

export type DialogProps = {
  /** Main body content */
  children: React.ReactNode;
  /** Props forwarded to the close button */
  closeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Props forwarded to the dialog container */
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Optional footer area */
  footer?: React.ReactNode;
  /** Controls whether the dialog is open */
  isOpen: boolean;
  /** Accessible label text */
  label: string;
  /** Called when the open state should change (e.g. on close) */
  onOpenChange: (open: boolean) => void;
  /** Dialog max-width size */
  size?: Size;
  /** Visual variant (determines border & icon) */
  variant?: Variant;
};

const ICONS: Record<Variant, JSX.Element | null> = {
  default: null,
  error: <i className="fa-solid fa-circle-xmark" />,
  info: <i className="fa-solid fa-circle-exclamation" />,
  success: <i className="fa-solid fa-circle-check" />,
  warning: <i className="fa-solid fa-triangle-exclamation" />,
};

const BorderColor: Record<Variant, string> = {
  default: 'var(--text-primary, #1f1f1f)',
  error: 'var(--status-error,   #ef3934)',
  info: 'var(--status-info,    #0052ff)',
  success: 'var(--status-success, #21a67a)',
  warning: 'var(--status-warning, #ff000f)',
};

const MaxWidth: Record<Size, string> = {
  lg: '640px',
  md: '480px',
  sm: '320px',
};

/**
 * A controlled, accessible dialog using Radix UI.
 */
const Dialog = ({
  children,
  closeButtonProps,
  contentProps,
  footer,
  isOpen,
  label,
  onOpenChange,
  size = 'md',
  variant = 'default',
}: DialogProps): JSX.Element => {
  const titleId = useId();

  return (
    <RadixDialog.Root
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <RadixDialog.Portal>
        <Overlay />
        <Content
          aria-labelledby={titleId}
          data-size={size}
          data-variant={variant}
          aria-modal="true"
          {...contentProps}
        >
          <Header>
            {ICONS[variant]}
            <Title id={titleId}>{label}</Title>
          </Header>
          <Body>{children}</Body>
          {footer ? <Footer>{footer}</Footer> : null}
          <RadixDialog.Close asChild>
            <CloseButton
              aria-label={closeButtonProps?.['aria-label'] ?? 'Close dialog'}
              {...closeButtonProps}
            >
              ×
            </CloseButton>
          </RadixDialog.Close>
        </Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

Dialog.displayName = 'Dialog';
export default Dialog;

/* ---------------- Styled Components ---------------- */

const Overlay = styled(RadixDialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: var(--backdrop, rgba(0, 0, 0, 0.5));
`;

const Content = styled(RadixDialog.Content)<{
  'data-size': Size;
  'data-variant': Variant;
}>`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 8px;
  border-top: 6px solid ${({ 'data-variant': v }) => BorderColor[v]};
  max-width: ${({ 'data-size': s }) => MaxWidth[s]};
  width: calc(100% - 2rem);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  outline: none;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Body = styled.div`
  flex: 1;
  margin-top: 1rem;
  overflow-y: auto;
`;

const Footer = styled.footer`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--focus-ring, #2684ff);
    outline-offset: 2px;
  }
`;
