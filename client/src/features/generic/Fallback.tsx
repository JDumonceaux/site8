import { memo } from 'react';

import styled, { keyframes } from 'styled-components';

const Fallback = memo((): React.JSX.Element => {
  return <Bar />;
});

Fallback.displayName = 'Fallback';

export default Fallback;

const Bar = styled.div`
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #f2f2f2;
  background-size: 300% 100%;
  animation: ${keyframes`
    0% {background-position: right}
  `} 2s infinite linear;
`;
