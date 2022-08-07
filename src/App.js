import './App.css';
import React, { Component } from 'react';

const CELL_NUMS=[7,8,9,4,5,6,1,2,3];

class App extends Component {

  // create state for the board
  state = {
    board: ['X', '', '','','','','','',''],
    player: 'X',
    winner: '',
    gameOver: false
  }

  // add a player to the board
  add = (index) => {
    if (this.state.gameOver) {
      return;
    }
    if (this.state.board[index] === '') {
      let newBoard = this.state.board;
      newBoard[index] = this.state.player;
      this.setState({
        board: newBoard
      });
      // this.checkWinner();
      // this.changePlayer();
    }
  }

  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          {/* LOGO & TITLE */}
          <div className="title-logo">
            {/* LOGO */}
            <div className="App-logo">
              <div className="App-logo-inner1">
                <div className="App-logo-inner1-inner1"></div>
                <div className="App-logo-inner1-inner2"></div>
              </div>
              <div className="App-logo-inner2">
                <div className="App-logo-inner2-inner1"></div>
                <div className="App-logo-inner2-inner2"></div>
              </div>
            </div>
            {/* TITLE */}
            <span id="title">Tic-Tac-Toe</span>
          </div>

          {/* BOARD */}
          <div id="board">
            {this.state.board.map((square, index) => 
              <div className="cell" onClick={()=>this.add(index)}>
                <span>{CELL_NUMS[index]}</span>
                <div class="cell-content">
                  {this.state.board[index]}
                </div>
              </div>
            )}
          </div>
        </header>
        
      </div>
    );
  }
}

export default App;
