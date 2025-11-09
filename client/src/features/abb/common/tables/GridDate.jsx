import React from 'react';
import { FormatDate } from 'react-globalize';

const GridDate = ({ children }) => {
  return <FormatDate>{new Date(children)}</FormatDate>;
};

export default GridDate;
