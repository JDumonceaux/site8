import React from 'react';
import { connect } from 'react-redux';

import { closeQuote, openQuote } from 'actions/QuoteActions';
import { msgFormatter } from 'app/util';
import DropDownMenu from 'wwwroot/feature/common/DropDownMenu';

const ViewStatus = ({ closeQuote, openQuote, quote }) => {
  const handleCloseQuote = () => {
    closeQuote(quote.QuoteID);
  };

  const handleOpenQuote = () => {
    openQuote(quote.QuoteID);
  };

  const status = msgFormatter(`server/status/short/${quote.StatusID}`)();

  const isMenuEnabled = !(
    quote.StatusID === 8 || // Transferred
    quote.StatusID === 2 || // Pending
    quote.StatusID === 9 || // Versions_Out_Of_Sync
    quote.UserAuth === true
  );

  const menuItems = [
    {
      isEnabled: quote.StatusID >= 5 && quote.StatusID < 8,
      onClick: handleOpenQuote,
      title: msgFormatter('openQuote')(),
    },
    {
      isEnabled: !(quote.StatusID >= 5 && quote.StatusID < 8),
      onClick: handleCloseQuote,
      title: msgFormatter('closeQuote')(),
    },
  ];

  let statusState = '';
  switch (quote.StatusID) {
    case 2: {
      // Pending
      statusState = 'error';
      break;
    }
    case 4: // Won
    case 6: {
      // Won
      statusState = 'info';
      break;
    }
    case 5: {
      // Closed
      statusState = 'disabled';
      break;
    }
    default: {
      statusState = 'success';
      break;
    }
  }

  return (
    <DropDownMenu
      isMenuEnabled={isMenuEnabled}
      items={menuItems}
      status={statusState}
      title={status}
      width="150px"
    />
  );
};

const mapStateToProps = (state) => ({
  quote: state.Quote.currentQuote,
});

export default connect(mapStateToProps, { closeQuote, openQuote })(ViewStatus);
