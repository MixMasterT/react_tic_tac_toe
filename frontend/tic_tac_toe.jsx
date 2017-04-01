import React from 'react';

import Board from './board';

import AITicTacToePlayer from '../js/ai_tic_tac_toe_player.js';
import TicTacToeModule from '../js/tic_tac_toe_module.js';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    this._defaultGameBoard = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];

    this.aiPlayer = new AITicTacToePlayer('O');

    let testTree = this.aiPlayer.getMove([
      ['X', ' ', ' '],
      ['O', 'X', 'X'],
      ['X', ' ', 'O']
    ], 'O', 'X');

    console.log(testTree);

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

      let newBoard = TicTacToeModule.copyBoard(this.state.board);
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
    const winner = TicTacToeModule.checkForWin(board, mark);
    this.setState({ winner });
  }

  render() {
    return (
      <div className='game'>
        <h3 className='title'>Tic Tac Toe</h3>
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
