import React from 'react';

const CardGrid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{children}</div>
);

export default CardGrid;
