import { DialogHTMLAttributes } from 'react';

type LoadingOverlayProps = {
  readonly title: string;
  readonly text?: string;
  bottomArea?: React.ReactNode;
} & DialogHTMLAttributes<HTMLDialogElement>;

export function LoadingOverlay({
  title,
  text,
  open,
  onClose,
  bottomArea,
  ...rest
}: LoadingOverlayProps): JSX.Element {
  return (
    <dialog
      id="modal"
      data-testid={'LoadingOverlay.root'}
      open={open}
      onClose={onClose}
      aria-labelledby="scroll-dialog-title"
      {...rest}>
      <button>Close</button>
      <h1>{title}</h1>
      <p>{text}</p>
      {bottomArea ? <div>{bottomArea}</div> : null}
    </dialog>
  );
}
