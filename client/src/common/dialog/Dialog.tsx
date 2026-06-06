import { type JSX, useId } from 'react';

import * as RadixDialog from '@radix-ui/react-dialog';
import type { Size, Variant } from './dialog-variants';
import styled from 'styled-components';

export type DialogProps = {
  /** Right-side action buttons in the structured footer */
  buttons?: React.ReactNode;
  /** Main body content */
  children: React.ReactNode;
  /** Props forwarded to the close button */
  closeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Props forwarded to the dialog container */
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Extra content below the button row (e.g. a confirm checkbox) */
  extra?: React.ReactNode;
  /** Optional freeform footer area (use structured props instead when possible) */
  footer?: React.ReactNode;
  /** Message area above buttons in the structured footer (e.g. validation errors) */
  footerMessage?: React.ReactNode;
  /** Optional actions rendered in the header bar (e.g. prev/next navigation) */
  headerActions?: React.ReactNode;
  /** Controls whether the dialog is open */
  isOpen: boolean;
  /** Accessible label text */
  label: string;
  /** Left side of the button row in the structured footer (e.g. delete button) */
  leftMenu?: React.ReactNode;
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

const getIcon = (variant: Variant): JSX.Element | null => ICONS[variant];

const MaxWidth: Record<Size, string> = {
  lg: '70dvw',
  md: '50dvw',
  sm: '30dvw',
  xl: '90dvw',
};

const getMaxWidth = (size: Size): string => MaxWidth[size];

/**
 * A controlled, accessible dialog using Radix UI.
 */
const Dialog = ({
  buttons,
  children,
  closeButtonProps,
  contentProps,
  extra,
  footer,
  footerMessage,
  headerActions,
  isOpen,
  label,
  leftMenu,
  onOpenChange,
  size = 'md',
  variant = 'default',
}: DialogProps): JSX.Element => {
  const titleId = useId();

  const hasStructuredFooter =
    buttons !== undefined ||
    extra !== undefined ||
    footerMessage !== undefined ||
    leftMenu !== undefined;

  let footerContent: JSX.Element | null = null;
  if (hasStructuredFooter) {
    footerContent = (
      <Footer>
        <FooterMessage aria-live="polite">{footerMessage}</FooterMessage>
        <FooterButtonRow>
          {leftMenu ? <FooterLeftMenu>{leftMenu}</FooterLeftMenu> : null}
          {buttons}
        </FooterButtonRow>
        {extra ?? null}
      </Footer>
    );
  } else if (footer !== undefined) {
    footerContent = (
      <Footer>
        <FooterRow>{footer}</FooterRow>
      </Footer>
    );
  }

  return (
    <RadixDialog.Root
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <RadixDialog.Portal>
        <Overlay />
        <Content
          aria-labelledby={titleId}
          aria-modal="true"
          data-size={size}
          {...contentProps}
        >
          <Header>
            {getIcon(variant)}
            <Title id={titleId}>{label}</Title>
            {headerActions ? (
              <HeaderActions>{headerActions}</HeaderActions>
            ) : null}
          </Header>
          <Body>{children}</Body>
          {footerContent}
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
export default Dialog;

/* ---------------- Styled Components ---------------- */

const Overlay = styled(RadixDialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background-color: var(--backdrop, rgba(0, 0, 0, 0.5));
`;

const Content = styled(RadixDialog.Content)<{
  'data-size': Size;
}>`
  position: fixed;
  top: calc(10% - 20px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 1101;
  background: var(--surface-background-color);
  border-radius: 8px;
  max-width: ${({ 'data-size': s }) => getMaxWidth(s)};
  max-height: 90dvh;
  width: calc(100% - 2rem);
  outline: none;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderActions = styled.div`
  align-items: center;
  display: flex;
  gap: 0.125rem;
  margin-left: auto;
  padding-right: 2rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
`;

// eslint-disable-next-line react-refresh/only-export-components
export const DialogScrollableContent = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.375rem;
`;

const Body = styled.div`
  flex: 1;
  margin-top: 0.5rem;
  overflow-y: auto;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
  padding: 0 0.375rem;
  width: 100%;
`;

const FooterRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const FooterMessage = styled.div`
  color: var(--status-error);
  font-size: 0.75rem;
  min-height: 1.25rem;
  padding: 0.375rem 0 0;
`;

const FooterButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  width: 100%;
`;

const FooterLeftMenu = styled.div`
  margin-right: auto;
`;

// eslint-disable-next-line react-refresh/only-export-components
export const DialogFooterLeft = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`;

// eslint-disable-next-line react-refresh/only-export-components
export const DialogFooterRight = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 1.5rem;
  line-height: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: var(--text-secondary-color);

  &:hover {
    color: var(--text-primary-color);
  }
`;
