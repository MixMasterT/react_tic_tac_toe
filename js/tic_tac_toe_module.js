const TicTacToeModule = (() => {
  const checkForWin = (board, mark) => {
      console.log('board is ', board);
      let winner = null;

      let rows = [];
      let leftDiagonal = [];
      let rightDiagonal = [];

      for (let i = 0; i < 3; i++) {
        let newRow = [];
        let newColumn = [];
        for (let j = 0; j < 3; j++) {
          newRow.push(board[i][j]);
          newColumn.push(board[j][i])
        }
        rows.push(newRow, newColumn);
        leftDiagonal.push(board[i][i]);
        rightDiagonal.push(board[i][2 - i]);
      }
      rows.push(leftDiagonal, rightDiagonal);

      rows.forEach((row) => {
        if (row.every((val) => val === mark)) {
          winner = mark;
        }
      });
      console.log('the winner was ', winner);
      console.log('the rows look like : ', rows);
      return winner;
    }

    return {
      checkForWin
    }
})();

export default TicTacToeModule;
