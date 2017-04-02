import TicTacToeModule from './tic_tac_toe_module';

class AITicTacToePlayer {
  constructor(mark) {
    this.mark = mark;
    this.oppositeMark = this.mark === 'X' ? 'O' : 'X';
  }

  getMove(boardState) {
    const emptySquares = TicTacToeModule.getEmptySquares(boardState);

    if (emptySquares.length === 0) { return; }

    let bestMove = emptySquares[0];
    let bestScore = null;

    for (let i = 0; i < emptySquares.length; i++) {
      const newBoard = TicTacToeModule.putMarkOnSquare(boardState, emptySquares[i], this.mark);
      const outcomeTree = this.buildOutcomeTree(newBoard, this.mark, this.oppositeMark);

      const score = this.getTreeScore(outcomeTree, 100);

      // console.log('for move: ', emptySquares[i]);
      // console.log('the score is ', score);

      if (bestScore === null || score > bestScore) {
        bestMove = emptySquares[i];
        bestScore = score;
      }
    }

    return bestMove;
  }

  getTreeScore(outcomeTree, scoreFactor) {
    let score = 0;
    const winner = TicTacToeModule.checkForWin(outcomeTree.value, this.mark);
    if (winner === this.mark) {
      score += scoreFactor;
    } else {
      outcomeTree.children.forEach((child) => {
        const childWinner = TicTacToeModule.checkForWin(child.value, this.oppositeMark);
        if (childWinner === this.oppositeMark) {
          score -= scoreFactor;
        } else {
          child.children.forEach((grandChild) => {
            score += this.getTreeScore(grandChild, scoreFactor / 10);
          })
        }
      })
    }
    return score;
  }

  buildOutcomeTree(board, mark, oppositeMark) {
    // root of tree will be an object with value = current board
    // it will also have a children property pointing to more similar objects in an array
    // each child will also have a children property
    // the value of each child will be the board after adding one more mark
    const root = { value: board, children: [] }
    const nextBoards = this.getNextBoardStates(oppositeMark, board);
    nextBoards.forEach((nextBoard) => {
      const newOutComeTree = this.buildOutcomeTree(nextBoard, oppositeMark, mark);
      root.children.push(newOutComeTree);
    })
    return root;
  }

  getNextBoardStates(mark, board) {
    const emptySquares = TicTacToeModule.getEmptySquares(board);
    const newBoards = [];
    emptySquares.forEach((emptySquare) => {
      let newBoard = TicTacToeModule.putMarkOnSquare(board, emptySquare, mark);
      newBoards.push(newBoard);
    });
    return newBoards;
  }
}

export default AITicTacToePlayer;
