import { DialogHTMLAttributes } from 'react';

type LoadingOverlayProps = {
  readonly title: string;
  readonly text?: string;
  readonly bottomArea?: React.ReactNode;
} & DialogHTMLAttributes<HTMLDialogElement>;

export const LoadingOverlay = ({
  bottomArea,
  onClose,
  open,
  text,
  title,
  ...rest
}: LoadingOverlayProps): JSX.Element => {
  return (
    <dialog
      aria-labelledby="scroll-dialog-title"
      data-testid="loading-overlay"
      id="modal"
      onClose={onClose}
      open={open}
      {...rest}>
      <button type="button">Close</button>
      <h1>{title}</h1>
      <p>{text}</p>
      {bottomArea ? <div>{bottomArea}</div> : null}
    </dialog>
  );
};
