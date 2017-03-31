import React from 'react';

import Square from './square';

const Row = ({ row, rowNum, squareNum, handleSquareClick }) => {
  return (
    <div className='row'>
      <Square value={row[0]}
        squareNum={0}
        rowNum={rowNum}
        handleSquareClick={handleSquareClick}
      />

      <Square value={row[1]}
        squareNum={1}
        rowNum={rowNum}
        handleSquareClick={handleSquareClick}
      />
      <Square value={row[2]}
        squareNum={2}
        rowNum={rowNum}
        handleSquareClick={handleSquareClick}
      />
    </div>
  )
}

export default Row;
