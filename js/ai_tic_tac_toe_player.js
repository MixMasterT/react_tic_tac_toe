class AITicTacToePlayer {
  constructor(mark) {
    this.mark = mark;
  }

  getMove(boardState) {


  }

  getNextBoardStates(mark, board) {
    const emptySquares = getEmptySquares(board);
    const newBoards = [];
    emptySquares.forEach((emptySquares) => {
      let newBoard = deepCopy(board);
      newBoard[emptySquares[0]][emptySquares[1]] = mark;
      newBoards.push(newBoard);
    });
    return newBoards;
  }

  getEmptySquares(board) {
    let emptySquares = [];
    board.forEach((row, rowIdx) => {
      row.forEach((square, squareIdx) => {
        if (square === ' ') {
          emptySquares.push([[rowIdx, squareIdx]]);
        }
      })
    });
    return emptySquares;
  }

}

export default AITicTacToePlayer;
