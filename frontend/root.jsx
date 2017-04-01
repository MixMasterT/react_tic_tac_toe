import React from 'react';
import ReactDOM from 'react-dom';

import TicTacToe from './tic_tac_toe';


class Root extends React.Component {
  render() {
    return(
      <div>
        <h3>WTF?</h3>
        <TicTacToe />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root />, document.getElementById('main'));
});
