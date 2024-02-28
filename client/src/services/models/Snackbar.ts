export type Snackbar = {
  contents: React.ReactNode | null;
  isOpen: boolean;
  openDurationMs?: number;
  variant?: SnackbarVariant;
  showCloseButton?: boolean;
};

export enum SnackbarVariant {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}
