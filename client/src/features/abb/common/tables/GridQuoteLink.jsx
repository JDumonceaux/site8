import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCurrentQuote } from 'actions/QuoteActions';
import PropTypes from 'prop-types';

const GridQuoteLink = ({ data, quote, rowData, setCurrentQuote }) => {
  const getQuote = () => {
    const q = quote || rowData || {};
    q.QuoteNo ||= '';
    q.QuoteID ||= '';
    q.QuoteName ||= '';
    return q;
  };

  const onClick = (error) => {
    const q = getQuote();
    setCurrentQuote(q.QuoteID);
    error.stopPropagation();
  };

  const q = getQuote();

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      onClick={onClick}
      to={`/quotes/${q.QuoteID}`}
    >
      {data}
    </Link>
  );
};

GridQuoteLink.propTypes = {
  data: PropTypes.node,
  quote: PropTypes.shape({
    QuoteID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    QuoteName: PropTypes.string,
    QuoteNo: PropTypes.string,
  }),
  rowData: PropTypes.shape({
    QuoteID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    QuoteName: PropTypes.string,
    QuoteNo: PropTypes.string,
  }),
  setCurrentQuote: PropTypes.func.isRequired,
};

export default connect(null, { setCurrentQuote })(GridQuoteLink);
