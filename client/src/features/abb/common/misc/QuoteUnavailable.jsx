import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearInvalidQuoteFlag } from 'actions/QuoteActions';
import { msgFormatter } from 'app/util';
import Banner from 'empower-components/Banner';
import {
  ContentSection,
  SubSection,
  SubSectionContent,
} from 'empower-components/ContentSection';

// QuoteUnavailable: Banner for unavailable/invalid quote
const QuoteUnavailable = ({ clearInvalidQuoteFlag, invalidQuote }) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (invalidQuote) {
      setShouldShow(true);

      // Clear flag after showing the message
      const timer = setTimeout(() => {
        clearInvalidQuoteFlag();
      }, 100); // Small delay to ensure render happens first

      return () => clearTimeout(timer);
    }
    setShouldShow(false);
  }, [invalidQuote, clearInvalidQuoteFlag]);

  if (!shouldShow) {
    return null;
  }

  return (
    <ContentSection className="col-xxs-12">
      <SubSection>
        <SubSectionContent>
          <Banner
            pageBanner
            data-testid="banner"
            level={4}
            message={msgFormatter('invalidQuoteId')()}
            title={msgFormatter('error')()}
          />
        </SubSectionContent>
      </SubSection>
    </ContentSection>
  );
};

QuoteUnavailable.propTypes = {
  clearInvalidQuoteFlag: PropTypes.func.isRequired,
  invalidQuote: PropTypes.bool,
};

QuoteUnavailable.displayName = 'QuoteUnavailable';

const mapStateToProps = (state) => ({
  invalidQuote: state.Quote.invalidQuote,
});

export default connect(mapStateToProps, { clearInvalidQuoteFlag })(
  memo(QuoteUnavailable),
);
