/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';

import { toggleFavorite } from 'actions/QuoteActions';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Favorite = ({ isFavorite, quoteId, toggleFavorite }) => {
  const handleFavoriteClick = () => {
    toggleFavorite(quoteId);
  };

  return (
    <FavoriteDiv $active={isFavorite}>
      <a onClick={handleFavoriteClick}>
        <i className={isFavorite ? 'fas fa-star' : 'fal fa-star'} />
      </a>
    </FavoriteDiv>
  );
};

Favorite.propTypes = {
  isFavorite: PropTypes.bool,
  quoteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  toggleFavorite: PropTypes.func.isRequired,
};

export default connect(null, { toggleFavorite })(Favorite);

const FavoriteDiv = styled.div`
  margin-right: 8px;
  i {
    color: ${(props) => (props.$active ? 'var(--abb-yellow)' : 'inherit')};
  }
`;
