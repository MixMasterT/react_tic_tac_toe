import React from 'react';

import Board from './board';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    const gameBoard = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];

    this.state = {
      board: gameBoard,
      currentMark: 'X',
      winner: null
    }

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
  }

  handleSquareClick(rowNum, squareNum) {
    return e => {
      const newBoard = this.state.board;
      newBoard[rowNum][squareNum] = this.state.currentMark;
      this.checkForWin(newBoard, this.state.currentMark);
      this.setState({ board: newBoard,
                      currentMark: this.state.currentMark === 'X' ? 'O' : 'X'});
    }
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
    if (winner != null) { this.setState({winner}) };
  }

  render() {
    console.log(this.state.winner);
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
      </div>
    )
  }

}

export default TicTacToe;
