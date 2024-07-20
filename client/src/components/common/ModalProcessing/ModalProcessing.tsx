import { DialogHTMLAttributes } from 'react';
import { Modal } from '../Modal';

// Cyclomatic Complexity: 1 (very low)
// Cognitive Complexity: Low
// Maintainability: High
// Single Responsibility Principle (SRP)
// Halstead difficulty: 12.63
// Halstead volume: 290.675
// Halstead effort: 3672.82
// Halstead bug prediction (B): 0.09689166666666667
// Halstead time: 203.82
// Halstead length: 55
// Halstead vocabulary: 39
// Halstead complexity: 1
// Halstead Metrics Summary
// Number of unique operators (n1): 20
// Number of unique operands (n2): 19
// Total occurrences of operators (N1): 31
// Total occurrences of operands (N2): 24

type ModalProcessingProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

/**
 * Renders a modal window for processing.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines whether the modal is open or not.
 * @param {string} [props.title='Save'] - The title of the modal window.
 * @param {Function} props.onClose - The function to be called when the modal is closed.
 * @param {Object} rest - The rest of the props to be spread on the Modal component.
 * @returns {JSX.Element} The rendered ModalProcessing component.
 */
export const ModalProcessing = ({
  isOpen,
  title = 'Save',
  onClose,
  ...rest
}: ModalProcessingProps): JSX.Element => {
  return (
    <Modal
      isLocked={false}
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      {...rest}>
      <p>
        I&apos;m a modal window, I don&apos;t use portals but use the dialog
        element from the platform.
      </p>
    </Modal>
  );
};
