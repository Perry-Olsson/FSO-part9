import React from 'react';

const Total: React.FC<{ total: number }> = ({ total }) => {
  return (
    <>
      <h4>Total</h4>
      <p>Number of exercies: {total}</p>
    </>
  );
};

export default Total;
