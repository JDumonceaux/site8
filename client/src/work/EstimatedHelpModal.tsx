import { showEstimateHelpModal } from 'actions/InteractionActions';
import React from 'react';
import { FormatMessage } from 'react-globalize';
import { connect } from 'react-redux';
import Button from './core/Button';
import Dialog from './core/Dialog';

interface EstimateHelpModalProps {
  show: boolean;
  data: {
    header: string;
    bodyTxt: string;
  };
  showEstimateHelpModal: (show: boolean) => void;
}

const EstimateHelpModal: React.FC<EstimateHelpModalProps> = ({
  show,
  data,
  showEstimateHelpModal,
}) => {
  const handleClose = () => {
    showEstimateHelpModal(false);
  };

  return (
    <Dialog
      label={
        <FormatMessage path={data.header}>
          How Estimated Date were Calculated?
        </FormatMessage>
      }
      isOpen={show}
      size="md"
      footer={
        <>
          <Button onClick={handleClose} variant="secondary">
            <FormatMessage path="yes">Close</FormatMessage>
          </Button>
        </>
      }>
      <div className="modal-body">
        <div className="mr-10 order-estimate-help-modal">
          <i className="fal fa-info-circle" />
        </div>
        <div>
          <FormatMessage path={data.bodyTxt}>Some text here</FormatMessage>
        </div>
      </div>
    </Dialog>
  );
};

const EstimateHelpModalContainer: React.FC<EstimateHelpModalProps> = (
  props,
) => {
  return props.show ? <EstimateHelpModal {...props} /> : null;
};

const mapStateToProps = (state: any) => ({
  //  ToDo: estimated misspelled
  show: state.Interaction.estimadeHelpModal.show,
  data: state.Interaction.estimadeHelpModal.data,
});

export default connect(mapStateToProps, { showEstimateHelpModal })(
  EstimateHelpModalContainer,
);
