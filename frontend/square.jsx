import React from 'react';

const Square = ({ value, squareNum, rowNum, handleSquareClick }) => {
  return (
    <div
      className='square'
      onClick={handleSquareClick(rowNum, squareNum)}
    >
      {value}
    </div>
  )
}

export default Square;
