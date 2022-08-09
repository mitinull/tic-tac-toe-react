import './App.css';
import React, { Component } from 'react';

const CELL_NUMS=[7,8,9,4,5,6,1,2,3];

class App extends Component {

  // create state for the board
  state = {
    board: ['', '', '','','','','','',''],
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
      this.checkWinner();
      this.changePlayer();
    }
  }

  // add a bot to the board
  addBot = () => {
    if (this.state.gameOver) {
      return;
    }
    const empty_inexes = this.state.board.map((square, index) => {
      if (square === '') {
        return index;
      }
    })//.filter(index => index !== undefined);
    // let index = Math.floor(Math.random() * empty_inexes.length);
    // if (this.state.board[empty_inexes[index]] === '') {
    //   let newBoard = this.state.board;
    //   newBoard[empty_inexes[index]] = this.state.player;
    //   this.setState({
    //     board: newBoard
    //   });
    //   this.checkWinner();
    //   this.changePlayer();
    // }
    // else {
    //   //throw error no empty cell
    //   // console.error('no empty cell');
    // }
  }

  // change the player
  changePlayer = () => {
    if (this.state.player === 'X') {
      this.setState({
        player: 'O'
      });
    } else {
      this.setState({
        player: 'X'
      });
    }
  }

  // check if there is a winner
  checkWinner = () => {
    let board = this.state.board;
    let winner = '';
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') {
      winner = board[0];
    } else if (board[3] === board[4] && board[4] === board[5] && board[3] !== '') {
      winner = board[3];
    } else if (board[6] === board[7] && board[7] === board[8] && board[6] !== '') {
      winner = board[6];
    } else if (board[0] === board[3] && board[3] === board[6] && board[0] !== '') {
      winner = board[0];
    } else if (board[1] === board[4] && board[4] === board[7] && board[1] !== '') {
      winner = board[1];
    } else if (board[2] === board[5] && board[5] === board[8] && board[2] !== '') {
      winner = board[2];
    } else if (board[0] === board[4] && board[4] === board[8] && board[0] !== '') {
      winner = board[0];
    } else if (board[2] === board[4] && board[4] === board[6] && board[2] !== '') {
      winner = board[2];
    } else if (board.every(cell => cell !== '')) {
      winner = 'tie';
    }
    this.setState({
      winner: winner,
      gameOver: (winner==='')?false:true,
    });
  }

  // reset the board
  reset = () => {
    this.setState({
      board: ['', '', '','','','','','',''],
      player: 'X',
      winner: '',
      gameOver: false,
      multyplayer: false,
    });
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

          {/* single or multiplayer buttons */}
          <div className='buttons'>
            <button id='ipbut' className='but' onClick={() => {
              this.reset();
              this.setState({
                multyplayer: false
              }
            )}}>1 Player {!this.state.multyplayer && '*'} </button>
            <button id='iipbut' className='but' onClick={() => {
              this.reset();
              this.setState({
                multyplayer: true
              }
            )}
            }>2 Player {this.state.multyplayer && '*'} </button>
          </div>

          {/* BOARD */}
          <div id="board">
            {this.state.board.map((square, index) => 
              <div className="cell" key={index} onClick={()=>this.add(index)}>
                <span>{CELL_NUMS[index]}</span>
                <div className="cell-content">
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
