import { useState } from 'react';

export type UseDialogReturn = {
  /** close the dialog */
  close: () => void;
  /** `true` when the dialog is open */
  isOpen: boolean;
  /** open the dialog */
  open: () => void;
  /** toggle open/closed */
  toggle: () => void;
};

/**
 * Manages boolean "open" state for a dialog (or any toggleable UI).
 *
 * @param initialOpen  whether the dialog should start open (default `false`)
 */
export const useDialog = (initialOpen = false): UseDialogReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return { close, isOpen, open, toggle };
};
