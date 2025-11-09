import React, { memo, useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

/**
 * ScrollToTop button appears after scrolling 50px and smooth-scrolls to top on click.
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setIsVisible(window.pageYOffset > 50);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Button
      $visible={isVisible}
      onClick={scrollToTop}
    >
      <i className="fas fa-chevron-up" />
    </Button>
  );
};

ScrollToTop.displayName = 'ScrollToTop';

export default memo(ScrollToTop);

const Button = styled.div`
  background: #a9a9a9;
  border-radius: 100%;
  bottom: 15%;
  color: #fff;
  cursor: pointer;
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  font-size: 32px;
  font-weight: bold;
  height: 45px;
  position: fixed;
  right: 3px;
  text-align: center;
  text-decoration: none;
  width: 45px;
  z-index: 3;
`;
