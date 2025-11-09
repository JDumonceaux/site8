import React from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import { msgFormatter } from 'app/util';
import styled from 'styled-components';
import ToolTipIcon from '../ToolTipIcon';
import Favorite from './Favorite';
import ViewStatus from './ViewStatus';
import ViewStatusIcon from './ViewStatusIcon';

const ViewHeader = ({
  children,
  hideMenu = false,
  quote,
  requireGovFundedAnswer,
}) => {
  const match = useRouteMatch();

  const fullVersionName =
    quote?.VersionID === 0
      ? msgFormatter('originalVersion')()
      : `${quote?.VersionName}${
          quote?.VersionDescription ? ` - ${quote?.VersionDescription}` : ''
        }`;

  const getShortVersionName = () => {
    if (quote?.VersionID === 0) {
      return msgFormatter('originalVersion')();
    }
    if (quote?.VersionName != null && quote?.VersionName.length > 29) {
      return `${quote?.VersionName.slice(0, 29)}...`;
    }
    return quote?.VersionName;
  };
  const shortVersionName = getShortVersionName();

  return (
    <WrapperDiv>
      {hideMenu ? (
        <div />
      ) : (
        <MenuDiv>
          <Favorite
            isFavorite={quote.Favorite}
            quoteId={quote.QuoteID}
          />
          {requireGovFundedAnswer && quote.GovernmentFunded ? (
            <ToolTipIcon
              status="error"
              title={msgFormatter('governmentProject')()}
              icon="government"
            />
          ) : null}
          {quote.DomesticPreference ? (
            <ToolTipIcon
              status="error"
              title={msgFormatter('domesticPreferenceProject')()}
              icon="us-flag"
            />
          ) : null}
          <div title={quote.QuoteName}>
            <Link to={match?.url}>{quote.QuoteName}</Link>
          </div>
          <div>
            <Link to={match?.url}>{quote.QuoteNo}</Link>
          </div>
          <div>
            <span title={fullVersionName}>{shortVersionName}</span>
          </div>
          <div>
            <ViewStatus />
          </div>
          <ViewStatusIcon />
        </MenuDiv>
      )}
      <div>{children}</div>
    </WrapperDiv>
  );
};

const mapStateToProps = (state) => ({
  quote: state.Quote.currentQuote,
  requireGovFundedAnswer: state.App.configuration.RequireGovFundedAnswer,
});

export default connect(mapStateToProps)(ViewHeader);

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 15px;
  padding-right: 12px;
  padding-top: 10px;
  background-color: white;
`;

const MenuDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  padding: 10px 15px;
  > div {
    display: flex;
    justify-content: flex-start;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  > div:not(:first-child):not(:last-child):after {
    content: '|';
    color: #cacdd0;
    padding: 0 6px;
  }
`;
