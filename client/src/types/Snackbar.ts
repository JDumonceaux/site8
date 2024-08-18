export type Snackbar = {
  contents: null | React.ReactNode;
  isOpen: boolean;
  openDurationMs?: number;
  showCloseButton?: boolean;
  variant?: SnackbarVariant;
};

export enum SnackbarVariant {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}
