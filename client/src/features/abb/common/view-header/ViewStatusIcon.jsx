import React from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';
import ToolTipIcon from '../ToolTipIcon';

const ViewStatusIcon = ({ quote }) => {
  return (
    <>
      {quote?.ReadOnly ? (
        quote.VersionType === 1 || quote.VersionType === 0 ? (
          <ToolTipIcon
            ariaHidden
            status="error"
            title={msgFormatter('viewOnly')()}
            icon="view-only"
          />
        ) : (
          <ToolTipIcon
            ariaHidden
            status="error"
            title={msgFormatter('snapshot')()}
            icon="snapshot"
          />
        )
      ) : null}
      {quote.VersionLocked ? (
        <ToolTipIcon
          ariaHidden
          title={msgFormatter('versionLocked')()}
          icon="locked"
        />
      ) : null}
    </>
  );
};

ViewStatusIcon.propTypes = {
  quote: PropTypes.shape({
    ReadOnly: PropTypes.bool,
    VersionLocked: PropTypes.bool,
    VersionType: PropTypes.number,
  }),
};

const mapStateToProps = (state) => ({
  quote: state.Quote.currentQuote,
});

export default connect(mapStateToProps, {})(ViewStatusIcon);
