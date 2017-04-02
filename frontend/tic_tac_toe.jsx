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
    //
    // let testTree = this.aiPlayer.getMove([
    //   ['O', 'O', 'X'],
    //   [' ', 'X', ' '],
    //   [' ', ' ', ' ']
    // ]);
    //
    // this.aiPlayer = null;
    //
    // console.log(testTree);

    this.state = {
      board: this._defaultGameBoard,
      gameHistory: [],
      currentMark: 'X',
      winner: null,
      isDraw: false,
      numPlayers: 1
    }

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.revertMove = this.revertMove.bind(this);
    this.updateCurrentMark = this.updateCurrentMark.bind(this);
    this.handleNumPlayerReset = this.handleNumPlayerReset.bind(this);
    this.makeMove = this.makeMove.bind(this);
  }

  makeMove(pos) {
    if (this.state.winner || this.state.isDraw) { return; }

    if (this.state.board[pos[0]][pos[1]] !== ' ') { alert('Square already occupied')}
    else {

      let newBoard = TicTacToeModule.putMarkOnSquare(this.state.board,
                                                     pos,
                                                     this.state.currentMark);

      this.checkForWin(newBoard, this.state.currentMark);
      this.updateCurrentMark();
      this.setState({
        board: newBoard,
        gameHistory: this.state.gameHistory.concat([newBoard])},
        () => {
          if (this.aiPlayer && !(this.state.winner || this.state.isDraw)) {
            let move = this.aiPlayer.getMove(newBoard);
            let newerBoard = TicTacToeModule.putMarkOnSquare(newBoard,
                                                             move,
                                                             this.state.currentMark);
            this.checkForWin(newerBoard, this.state.currentMark);
            this.updateCurrentMark();
            this.setState({ board: newerBoard,
                            gameHistory: this.state.gameHistory.concat([newerBoard])});
          }
      });

    }
  }

  handleSquareClick(rowNum, squareNum) {
    return e => {
      this.makeMove([rowNum, squareNum]);
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
    let winner = TicTacToeModule.checkForWin(board, mark);
    let isDraw = false;
    if (TicTacToeModule.getEmptySquares(board).length === 0 &&
        winner === null) {
      isDraw = true;
    }
    this.setState({ winner, isDraw });
  }

  handleNumPlayerReset(e) {
    if (e.target.value === '1') {
      // console.log('AI player being set');
      this.aiPlayer = new AITicTacToePlayer('O');
    } else {
      this.aiPlayer = null;
    }
    this.setState({ numPlayers: e.target.value,
                    board: this._defaultGameBoard,
                    winner: null,
                    isDraw: false,
                    gameHistory: []})
  }

  render() {
    return (
      <div className='game'>
        <h3 className='title'>Tic Tac Toe</h3>
        <h5>Select number of players:
          <select
            onChange={this.handleNumPlayerReset}
            defaultValue={1}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </h5>
        <h6>Current game is {this.state.numPlayers} player{
            this.state.numPlayers < 2 ? '' : 's'}
          </h6>

        <Board
          rows={this.state.board}
          handleSquareClick={this.handleSquareClick}
        />
      <h3>{this.state.isDraw ?
          'The game is a draw.' :
          this.state.winner ?
          `${this.state.winner} wins!`:
          `Now it's ${this.state.currentMark}'s turn...`}</h3>
        <button onClick={this.revertMove}>undo move</button>
      </div>
    )
  }
}

export default TicTacToe;
