import styled from 'styled-components';

import './menuIcon.css';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export function MenuIcon() {
  return (
    <span className='hamburger-control__wrapper'>
      <span className='hamburger-control__title'>Menu</span>
    </span>
  );
}
