import TicTacToeModule from './tic_tac_toe_module';

class AITicTacToePlayer {
  constructor(mark) {
    this.mark = mark;
    this.oppositeMark = this.mark === 'X' ? 'O' : 'X';
  }

  getMove(boardState) {
    // let currentBoard = TicTacToeModule.copyBoard(boardState);
    const emptySquares = TicTacToeModule.getEmptySquares(boardState);

    // console.log(emptySquares);

    if (emptySquares.length === 0) { return; }

    for (let i = 0; i < emptySquares.length; i++) {
      const newBoard = TicTacToeModule.putMarkOnSquare(boardState, emptySquares[i], this.mark);
      const outcomeTree = this.buildOutcomeTree(newBoard, this.mark, this.oppositeMark);

      // console.log(outcomeTree);

      if (this.treeDFSForWin(outcomeTree)) {
        return emptySquares[i];
      }
    }
    // console.log("no win found");
    for (let i = 0; i < emptySquares.length; i++) {
      const newBoard = TicTacToeModule.putMarkOnSquare(boardState, emptySquares[i], this.mark);
      const outcomeTree = this.buildOutcomeTree(newBoard, this.mark, this.oppositeMark);

      // console.log("on square ", emptySquares[i]);
      // console.log(outcomeTree);
      // console.log((this.treeDFSForLoss(outcomeTree)));

      if (this.treeDFSForLoss(outcomeTree) !== true) {
        return emptySquares[i]
      }
    }

    return emptySquares[0];
  }

  treeDFSForWin(outcomeTree) {
    if (TicTacToeModule.checkForWin(outcomeTree.value, this.mark)) {
      return true;
    } else if (outcomeTree.children.length === 0) {
      return false;
    } else {
      let winFound;
      for (let i = 0; i < outcomeTree.children.length; i++) {
        winFound = this.treeDFSForWin(outcomeTree.children[i]);
        if (winFound) { return true; }
      }
    }
  }

  treeDFSForLoss(outcomeTree) {
    if (TicTacToeModule.checkForWin(outcomeTree.value, this.oppositeMark)) {
      return true;
    } else if (outcomeTree.children.length === 0) {
      return false;
    } else {
      let lossFound;
      for (let i = 0; i < outcomeTree.children.length; i++) {
        lossFound = this.treeDFSForLoss(outcomeTree.children[i]);
        if (lossFound) { return true; }
      }
    }
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
