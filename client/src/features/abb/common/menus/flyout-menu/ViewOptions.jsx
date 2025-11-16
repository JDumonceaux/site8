import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { msgFormatter } from 'app/util';
import styled from 'styled-components';
import DetailsOptions from './DetailsOptions';

// ViewOptions: Renders a set of DetailsOptions for view selection
const ViewOptions = ({ items, onChange, path, value }) => {
  const handleViewChange = (value_) => {
    onChange(value_);
  };

  const positions = ['left', 'center', 'right'];
  const elements = items.map((item, index) => ({
    ...item,
    position: item.position || positions[index % positions.length],
  }));

  return (
    <WrapperDiv>
      <TitleDiv>{msgFormatter(path)()}</TitleDiv>
      <RightDiv>
        {elements.map((item) => (
          <DetailsOptions
            key={item.value}
            active={value === item.value}
            path={item.path}
            value={item.value}
            onChange={handleViewChange}
            position={item.position}
          />
        ))}
      </RightDiv>
    </WrapperDiv>
  );
};

ViewOptions.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      position: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
  path: PropTypes.string,
  value: PropTypes.string,
};

ViewOptions.displayName = 'ViewOptions';

ViewOptions.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      position: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
  path: PropTypes.string,
  value: PropTypes.string,
};

export default memo(ViewOptions);

const WrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 5px;
  margin: 16px 0;
`;
const RightDiv = styled.div`
    display: flex;
    justify-content.flex-end;
    width: 220px;
`;
const TitleDiv = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
