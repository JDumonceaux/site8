import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import DialogSaving from './DialogSaving';

describe('DialogSaving', () => {
  it('renders the children', () => {
    render(<DialogSaving isOpen={true}>Hello World</DialogSaving>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with the specified role', () => {
    render(
      <DialogSaving isOpen={true} role="alertdialog">
        Hello World
      </DialogSaving>,
    );
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('shows the dialog when isOpen is true', () => {
    render(<DialogSaving isOpen={true}>Hello World</DialogSaving>);
    const dialog = screen.getByTestId('DialogSaving');
    expect(dialog).toHaveAttribute('open');
  });

  it('hides the dialog when isOpen is false', () => {
    render(<DialogSaving isOpen={false}>Hello World</DialogSaving>);
    const dialog = screen.getByTestId('DialogSaving');
    expect(dialog).not.toHaveAttribute('open');
  });

  it('calls the onClose callback when the Close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <DialogSaving isOpen={true} onClose={onClose}>
        Hello World
      </DialogSaving>,
    );
    const closeButton = screen.getByText('Close');
    userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
