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
    console.log("win check ran");
    console.log("mark is ", mark);
    console.log("board = ", board);
    let winner = null;
    //check rows
    board.forEach((row) => {
      if (row.every((val) => val === mark)) {
        winner = mark;
      }
    });
    //check columns
    if (winner === null) {
      for (let i = 0; i < 3; i++) {
        if (board.every((row) => row[i] === mark)) {
          winner = mark;
        }
      }
    }
    //check diagonals
    if (winner === null) {
      for (let j = 0; j < 3; j++) {
        if (board[j][j] != mark) {
          break;
        }
        winner = mark;
      }
    }
    //check diagonals
    if (winner === null) {
      for (let k = 0; k < 3; k++) {
        if (board[k][2 - k] != mark) {
          break;
        }
        winner = mark;
      }
    }
    console.log(winner);
    if (winner != null) { this.setState({winner}) };
  }

  render() {
    return (
      <div className='game'>
        <h3>Tic Tac Toe</h3>
        <Board
          rows={this.state.board}
          handleSquareClick={this.handleSquareClick}
        />
      </div>
    )
  }

}

export default TicTacToe;
