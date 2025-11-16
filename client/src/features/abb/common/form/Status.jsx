import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { msgFormatter } from 'app/util';
import styled from 'styled-components';
import { handleColorType } from 'wwwroot/feature/common/StyleColorType';
import FieldMargin from './FieldMargin';
import Label from './Label';

// Status: Displays status label and colored status text
const Status = ({ margin, statusId, ...rest }) => {
  // Memoize statusState for performance
  const statusState = useMemo(() => {
    switch (statusId) {
      case 2:
        // Pending
        return 'error';
      case 3:
        // Submitted
        return 'warning';
      case 4: // Won
      case 6:
        // Won
        return 'info';
      case 5:
        // Closed
        return 'disabled';
      default:
        return 'success';
    }
  }, [statusId]);

  return (
    <FieldMargin margin={margin}>
      <Label
        label={msgFormatter('status')()}
        {...rest}
      />
      <StatusDiv $status={statusState}>
        {msgFormatter(`server/status/short/${statusId}`)()}
      </StatusDiv>
    </FieldMargin>
  );
};

Status.propTypes = {
  margin: PropTypes.string,
  statusId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Status.displayName = 'Status';

export default memo(Status);

// Styled component for status text color
const StatusDiv = styled.div`
  color: ${(props) => handleColorType(props.$status)};
`;
