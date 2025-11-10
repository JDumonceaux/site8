import React from 'react';

import { msgFormatter } from 'app/util';
import Tooltip from 'empower-components/Tooltip';
import styled from 'styled-components';

const GridOrderLink = ({ orderURL, poNumber, salesOrder, statusId }) => {
  if (poNumber !== null) {
    if (statusId === -1) {
      return <div>{poNumber}</div>;
    }
    return (
      <StyledLink>
        <a
          href={orderURL}
          rel="noreferrer"
          target="_blank"
        >
          {poNumber}
        </a>
      </StyledLink>
    );
  }
  if (statusId === -1) {
    return <div />;
  }
  if (salesOrder === '1') {
    return <div>{msgFormatter('inProgress')()}</div>;
  }
  if (salesOrder === '-1') {
    if (statusId !== 0) {
      const failedOrderInfo = msgFormatter('failedOrderInfo')();
      return (
        <div>
          {msgFormatter('failed')()}
          <Tooltip title={failedOrderInfo}>
            <i
              className="fa fa-info-circle"
              // eslint-disable-next-line react/forbid-dom-props
              style={{ marginLeft: '5px' }}
            />
          </Tooltip>
        </div>
      );
    }
    return <div>{msgFormatter('failedDeleted')()}</div>;
  }
  if (orderURL !== null) {
    return (
      <StyledLink>
        <a
          href={orderURL}
          rel="noreferrer"
          target="_blank"
        >
          {salesOrder}
        </a>
      </StyledLink>
    );
  }
  return <div />;
};

export default GridOrderLink;

const StyledLink = styled.div`
  text-decoration: underline;
`;
