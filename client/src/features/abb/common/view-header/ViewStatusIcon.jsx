import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ToolTipIcon from '../ToolTipIcon';

const ViewStatusIcon = ({ quote }) => {
  // Defensive: if quote is missing, render nothing
  if (!quote || typeof quote !== 'object') {
    return null;
  }

  const icons = [];
  if (quote.ReadOnly) {
    if (quote.VersionType === 1 || quote.VersionType === 0) {
      icons.push(
        <ToolTipIcon
          key="view-only"
          ariaHidden
          status="error"
          title={msgFormatter('viewOnly')()}
          icon="view-only"
        />,
      );
    } else {
      icons.push(
        <ToolTipIcon
          key="snapshot"
          ariaHidden
          status="error"
          title={msgFormatter('snapshot')()}
          icon="snapshot"
        />,
      );
    }
  }
  if (quote.VersionLocked) {
    icons.push(
      <ToolTipIcon
        key="locked"
        ariaHidden
        title={msgFormatter('versionLocked')()}
        icon="locked"
      />,
    );
  }
  return <>{icons}</>;
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
