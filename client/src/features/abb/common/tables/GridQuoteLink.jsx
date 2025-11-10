import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCurrentQuote } from 'actions/QuoteActions';

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
    <Link
      onClick={onClick}
      to={`/quotes/${q.QuoteID}`}
    >
      {data}
    </Link>
  );
};

export default connect(null, { setCurrentQuote })(GridQuoteLink);
