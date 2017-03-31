import React from 'react';

import Board from './board';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    this._defaultGameBoard = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];

    this.state = {
      board: this._defaultGameBoard,
      gameHistory: [],
      currentMark: 'X',
      winner: null
    }

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.revertMove = this.revertMove.bind(this);
    this.updateCurrentMark = this.updateCurrentMark.bind(this);
  }

  handleSquareClick(rowNum, squareNum) {
    return e => {
      if (this.state.winner) { return; }
      const newBoard = [];
      // this forEach with .slice() business is necessary for deep duplicate
      // otherwise the board is passed by reference
      this.state.board.forEach((row) => newBoard.push(row.slice()));
      newBoard[rowNum][squareNum] = this.state.currentMark;
      this.checkForWin(newBoard, this.state.currentMark);
      this.setState({ board: newBoard,
                      gameHistory: this.state.gameHistory.concat([newBoard])});
      this.updateCurrentMark();
    }
  }

  updateCurrentMark() {
    this.setState({ currentMark: this.state.currentMark === 'X' ? 'O' : 'X' })
  }

  revertMove(e) {
    e.preventDefault();
    if (this.state.gameHistory.length === 0) { return; }
    let { gameHistory } = this.state;
    gameHistory.pop();
    const board = gameHistory.length > 0 ?
      gameHistory[gameHistory.length - 1] :
      this._defaultGameBoard;
      
    this.setState({ board, gameHistory });
    this.checkForWin(board, this.state.currentMark);
    this.updateCurrentMark();
  }

  checkForWin(board, mark) {
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
    this.setState({ winner });
  }

  render() {
    return (
      <div className='game'>
        <h3>Tic Tac Toe</h3>
        <Board
          rows={this.state.board}
          handleSquareClick={this.handleSquareClick}
        />
      <h3>{this.state.winner ?
          `${this.state.winner} wins!`:
          `Now it's ${this.state.currentMark}'s turn...`}</h3>
        <button onClick={this.revertMove}>undo move</button>
      </div>
    )
  }
}

export default TicTacToe;
