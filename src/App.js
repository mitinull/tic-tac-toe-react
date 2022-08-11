import './App.css';
import React, { Component } from 'react';
import { MdRestartAlt, MdSettings } from 'react-icons/md';
import {BsPeopleFill, BsPersonFill} from 'react-icons/bs';



const setTheme = theme => document.documentElement.className = theme;
const themes = ['theme1', 'theme2', 'theme3'];
let themeIndex = 0;
const CELL_NUMS=[7,8,9,4,5,6,1,2,3];
let setting_opened = false;

class App extends Component {

  constructor() {
    super();
    this.myref = React.createRef();
  }

  componentDidMount() {
    this.myref.current.focus();
  }

  // create state for the board
  state = {
    board: ['', '', '','','','','','',''],
    player: 'X',
    winner: '',
    gameOver: false,
    language: 'en',
    setting_open: false,
  }

  content = {
    en: {
      button1: '1Player',
      button2: '2Player',
      button3: 'Restart',
      button4: 'Theme',
      button5: 'فارسی',
    },
    fa: {
      button1: 'یک نفره',
      button2: 'دو نفره',
      button3: 'بازنشانی',
      button4: 'تم',
      button5: 'Enghlish',
    }
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
      if (!this.state.multyplayer) {
        setTimeout(this.addBot, 0)
      }
    }
   
  }

  // add a bot to the board
  addBot = () => {
    if (this.state.gameOver) {
      return;
    }
    const empty_inexes = []
    this.state.board.forEach((square, index) => {
      if (square === '') {
        empty_inexes.push(index);
      }
    } )
    //  = this.state.board.map((square, index) => {
    //   // if (square === '') {
    //   //   return index;
    //   // }
    // })//.filter(index => index !== undefined);
    let index = Math.floor(Math.random() * empty_inexes.length);
    if (this.state.board[empty_inexes[index]] === '') {
      let newBoard = this.state.board;
      newBoard[empty_inexes[index]] = this.state.player;
      this.setState({
        board: newBoard
      });
      this.checkWinner();
      this.changePlayer();
    }
    else {
      //throw error no empty cell
      // console.error('no empty cell');
    }
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
    });
  }


  render() {
    return (
      <div className="App" tabIndex="1" ref={this.myref}
       onKeyDown={(key) => !this.state.setting_open && (key.key==='0'?this.reset():this.add(CELL_NUMS[Number(key.key)-1]-1))}>
        
        <header className="App-header">
          {/* LOGO & TITLE */}
          <div className="title-logo">
            {/* LOGO */}
            <div className="App-logo-container">
              <div className="App-logo App-logo-border">
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
              </div>
            </div>
            {/* TITLE */}
            <span id="title">Tic-Tac-Toe</span>
          </div>

          {/* buttons */}
          <div className='buttons' dir={(this.state.language==='en')?'ltr':'rtl'}>
            
            {/* 1player icon */}
            <BsPersonFill id="mpico" className='icon'
            style={{ color: !this.state.multyplayer&&
              !this.state.setting_open?
              'var(--select-color)' : '' }} onClick={() => {
              if (this.state.multyplayer){this.reset();}
              this.setState({multyplayer: false,setting_open: false})
            }}/>
            
            
            {/* 2player icon */}
            <BsPeopleFill id="mpico" className='icon'
            style={{ color: this.state.multyplayer&&
              !this.state.setting_open?
              'var(--select-color)' : '' }} onClick={() => {
              if (!this.state.multyplayer){this.reset();}
              this.setState({multyplayer: true,setting_open: false})
            }}/>
            {/* setting icon */}
            <MdSettings id='setico' className='icon'
            style={{ color: this.state.setting_open?
              'var(--select-color)' : '' }}
            onClick={() => {this.setState({setting_open:!this.state.setting_open});setting_opened=true;}} />
            
            {/* reset icon */}
            <MdRestartAlt id="resico" className='icon'
            onClick={() => {this.reset();}} display='none'/>

            
          </div>

          {/* BOARD */}
          {!this.state.setting_open && <div id="board"
          style={{animation: setting_opened && 'setting-scale .5s'}}>
            {this.state.board.map((square, index) => 
              <div className="cell" key={index} onClick={()=>this.add(index)}>
                <span>{CELL_NUMS[index]}</span>
                <div className="cell-content">
                  {square}
                </div>
              </div>
            )}
          </div>}

          {/* SETTING */}
          {this.state.setting_open && <div id="setting">
            
          </div>}

          {/* bottom buttons */}
          <div className='buttons bottombuttons'
           dir={(this.state.language==='en')?'ltr':'rtl'}
           hidden>
            
            {/* change theme button */}
            <button id='tbut' className='but' onClick={() => {
              setTheme(themes[(++themeIndex)%3]);}
            }>{this.content[this.state.language].button4}</button>

            {/* change language button */}
            <button id='lbut' className='but' onClick={() => {
              this.setState({
                language: (this.state.language === 'en') ? 'fa' : 'en',
              })
            }}>{this.content[this.state.language].button5}</button>
          </div>
          
        </header>
        
      </div>
    );
  }
}

export default App;
