import { showGetPriceModal } from 'actions/InteractionActions';
import { priceQuote } from 'actions/QuoteActions';
import React from 'react';
import { FormatMessage } from 'react-globalize';
import { connect } from 'react-redux';
import Button from './core/Button';
import Dialog from './core/Dialog';

interface GetPriceModalProps {
  data: {
    show: boolean;
    quoteID: number | null;
  };
  priceQuote: (quoteID: number | null) => void;
  showGetPriceModal: (show: boolean, quoteID: number | null) => void;
}

const GetPriceModal: React.FC<GetPriceModalProps> = ({
  data,
  priceQuote,
  showGetPriceModal,
}) => {
  const handleNoClick = () => {
    showGetPriceModal(false, null);
  };

  const handleYesClick = () => {
    priceQuote(data.quoteID);
    showGetPriceModal(false, null);
  };

  return (
    <Dialog
      label={<FormatMessage path="priceQuote">Price Quote</FormatMessage>}
      isOpen={data.show}
      size="md"
      footer={
        <>
          <Button onClick={handleNoClick} variant="secondary">
            <FormatMessage path="no">No</FormatMessage>
          </Button>
          <Button onClick={handleYesClick}>
            <FormatMessage path="yes">Yes</FormatMessage>
          </Button>
        </>
      }>
      <div>
        <FormatMessage path="repricePrompt">
          This action will re-price your quote. Any pricing changes made to this
          quote will be lost.
        </FormatMessage>
      </div>
      <div>
        {/* ToDo: ContinuePrompt misspelled. */}
        <FormatMessage path="continePrompt">
          Do you want to continue?
        </FormatMessage>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state: any) => ({
  data: {
    show: state.Interaction.getPriceModal.show,
    quoteID: state.Interaction.getPriceModal.quoteID,
  },
});

export default connect(mapStateToProps, { priceQuote, showGetPriceModal })(
  GetPriceModal,
);
