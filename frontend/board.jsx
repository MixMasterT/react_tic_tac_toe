import React from 'react';

import Row from './row';

const Board = ({ rows, handleSquareClick }) => {
  return (
    <div className='board'>
      <Row row={rows[0]} rowNum={0} handleSquareClick={handleSquareClick} />
      <Row row={rows[1]} rowNum={1} handleSquareClick={handleSquareClick} />
      <Row row={rows[2]} rowNum={2} handleSquareClick={handleSquareClick} />
    </div>
  )
}

export default Board;
