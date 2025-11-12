import React from 'react';

import Menu from 'empower-components/FlyoutMenu';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// This is a wrapper around the empower FlyoutMenu to provide consistent styling and structure
// for flyout menus used in the application.
const FlyoutMenu = ({ children, footer, show, title, titleExtra }) => {
  if (!show) {
    return null;
  }

  const titleLine =
    title && titleExtra ? (
      <>
        <Title>{title}</Title>
        <TitleExtra>{titleExtra}</TitleExtra>
      </>
    ) : !title && titleExtra ? (
      <TitleExtra>{titleExtra}</TitleExtra>
    ) : (
      <Title>{title}</Title>
    );

  return (
    <Menu>
      {titleLine ? <TitleDiv>{titleLine}</TitleDiv> : null}
      <ContentDiv>{children}</ContentDiv>
      {footer ? <FooterDiv>{footer}</FooterDiv> : null}
    </Menu>
  );
};

FlyoutMenu.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  show: PropTypes.bool,
  title: PropTypes.string,
  titleExtra: PropTypes.node,
};

FlyoutMenu.displayName = 'FlyoutMenu';
export default FlyoutMenu;

const TitleDiv = styled.div`
  border-bottom: 1px solid #cacdd0;
  min-height: 37px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 7px;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 8px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
`;
const TitleExtra = styled.div`
  font-size: 14px;
`;
const ContentDiv = styled.div`
  width: calc(100% - 20px);
  position: absolute;
  top: 60px;
  bottom: 80px;
  overflow-x: hidden;
  padding: 15px 15px;
`;
const FooterDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0px;
  width: calc(100% - 15px);
  padding: 5px;
  border-top: 1px solid #cacdd0;
  height: 50px;
  text-align: center;
  column-gap: 10px;
`;
