import { useState } from 'react';

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onDialogOpen = () => {
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onDialogClose,
    onDialogOpen,
  };
};
