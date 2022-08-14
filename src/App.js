import './App.css';
import React, { Component } from 'react';
import { MdRestartAlt, MdSettings } from 'react-icons/md';
import {BsPeopleFill, BsPersonFill} from 'react-icons/bs';
import {RiBrushFill, RiCloseLine,
   RiRestartLine, RiRestartFill}
from 'react-icons/ri';
import hardIndex from './minimax.js';



const setTheme = theme => document.documentElement.className = theme;
const themes = ['theme1', 'theme2', 'theme3'];
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
    themeIndex: 0,
    sound_on: true,
    game_level: 'medium',
  }

  content = {
    en: {
      button1: 'Easy',
      button2: 'Medium',
      button3: 'Hard',
    },
    fa: {
      button1: 'راحت',
      button2: 'متوسط',
      button3: 'سخت',
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
    let index = empty_inexes[
      Math.floor(Math.random() * empty_inexes.length)];
    if( this.state.game_level === 'medium' ) {
      index = this.mediumIndex(index);
    }
    if( this.state.game_level === 'hard' ) {
      index = hardIndex(this.state.board, this.state.player);
    }
    // console.log(index);
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

  // add a medium bot to the board
  mediumIndex = (i) => {
    if (this.state.board[0] === '') {
      if (this.state.board[1] === this.state.player
        && this.state.board[2] === this.state.player) {
          return 0;
      }
      if (this.state.board[3] === this.state.player
        && this.state.board[6] === this.state.player) {
          return 0;
      }
      if (this.state.board[4] === this.state.player
        && this.state.board[8] === this.state.player) {
          return 0;
      }
    }
    if (this.state.board[1] === '') {
      if (this.state.board[0] === this.state.player
        && this.state.board[2] === this.state.player) {
          return 1;
      }
      if (this.state.board[4] === this.state.player
        && this.state.board[7] === this.state.player) {
          return 1;
      }
    }
    if (this.state.board[2] === '') {
      if (this.state.board[0] === this.state.player
        && this.state.board[1] === this.state.player) {
          return 2;
      }
      if (this.state.board[5] === this.state.player
        && this.state.board[8] === this.state.player) {
          return 2;
      }
      if (this.state.board[4] === this.state.player
        && this.state.board[6] === this.state.player) {
          return 2;
      }
    }
    if (this.state.board[3] === '') {
      if (this.state.board[0] === this.state.player
        && this.state.board[6] === this.state.player) {
          return 3;
      }
    }
    if (this.state.board[4] === '') {
      if (this.state.board[1] === this.state.player
        && this.state.board[7] === this.state.player) {
          return 4;
      }
      if (this.state.board[0] === this.state.player
        && this.state.board[8] === this.state.player) {
          return 4;
      }
      if (this.state.board[2] === this.state.player
        && this.state.board[6] === this.state.player) {
          return 4;
      }
      if (this.state.board[3] === this.state.player
        && this.state.board[5] === this.state.player) {
          return 4;
      }
    }
    if (this.state.board[5] === '') {
      if (this.state.board[2] === this.state.player
        && this.state.board[8] === this.state.player) {
          return 5;
      }
      if (this.state.board[3] === this.state.player
        && this.state.board[4] === this.state.player) {
          return 5;
      }
    }
    if (this.state.board[6] === '') {
      if (this.state.board[0] === this.state.player
        && this.state.board[3] === this.state.player) {
          return 6;
      }
      if (this.state.board[7] === this.state.player
        && this.state.board[8] === this.state.player) {
          return 6;
      }
      if (this.state.board[4] === this.state.player
        && this.state.board[2] === this.state.player) {
          return 6;
      }
    }
    if (this.state.board[7] === '') {
      if (this.state.board[1] === this.state.player
        && this.state.board[4] === this.state.player) {
          return 7;
      }
      if (this.state.board[6] === this.state.player
        && this.state.board[8] === this.state.player) {
          return 7;
      }
    }
    if (this.state.board[8] === '') {
      if (this.state.board[2] === this.state.player
        && this.state.board[5] === this.state.player) {
          return 8;
      }
      if (this.state.board[6] === this.state.player
        && this.state.board[7] === this.state.player) {
          return 8;
      }
    }

    // avoid opponent winning
    if (this.state.board[0] === '') {
      if (this.state.board[1] !== this.state.player
        && this.state.board[1] !== ''
        && this.state.board[2] !== this.state.player
        && this.state.board[2] !== '') {
          return 0;
      }
      if (this.state.board[3] !== this.state.player
        && this.state.board[3] !== ''
        && this.state.board[6] !== this.state.player
        && this.state.board[6] !== '') {
          return 0;
      }
      if (this.state.board[4] !== this.state.player
        && this.state.board[4] !== ''
        && this.state.board[8] !== this.state.player
        && this.state.board[8] !== '') {
          return 0;
      }
    }
    if (this.state.board[1] === '') {
      if (this.state.board[0] !== this.state.player
        && this.state.board[0] !== ''
        && this.state.board[2] !== this.state.player
        && this.state.board[2] !== '') {
          return 1;
      }
      if (this.state.board[4] !== this.state.player
        && this.state.board[4] !== ''
        && this.state.board[7] !== this.state.player
        && this.state.board[7] !== '') {
          return 1;
      }
    }
    if (this.state.board[2] === '') {
      if (this.state.board[0] !== this.state.player
        && this.state.board[0] !== ''
        && this.state.board[1] !== this.state.player
        && this.state.board[1] !== '') {
          return 2;
      }
      if (this.state.board[5] !== this.state.player
        && this.state.board[5] !== ''
        && this.state.board[8] !== this.state.player
        && this.state.board[8] !== '') {
          return 2;
      }
      if (this.state.board[4] !== this.state.player
        && this.state.board[4] !== ''
        && this.state.board[6] !== this.state.player
        && this.state.board[6] !== '') {
          return 2;
      }
    }
    if (this.state.board[3] === '') {
      if (this.state.board[0] !== this.state.player
        && this.state.board[0] !== ''
        && this.state.board[6] !== this.state.player
        && this.state.board[6] !== '') {
          return 3;
      }
      if (this.state.board[4] !== this.state.player
        && this.state.board[4] !== ''
        && this.state.board[5] !== this.state.player
        && this.state.board[5] !== '') {
          return 3;
      }
    }
    if (this.state.board[4] === '') {
      if (this.state.board[1] !== this.state.player
        && this.state.board[1] !== ''
        && this.state.board[7] !== this.state.player
        && this.state.board[7] !== '') {
          return 4;
      }
      if (this.state.board[3] !== this.state.player
        && this.state.board[3] !== ''
        && this.state.board[5] !== this.state.player
        && this.state.board[5] !== '') {
          return 4;
      }
      if (this.state.board[0] !== this.state.player
        && this.state.board[0] !== ''
        && this.state.board[8] !== this.state.player
        && this.state.board[8] !== '') {
          return 4;
      }
      if (this.state.board[2] !== this.state.player
        && this.state.board[2] !== ''
        && this.state.board[6] !== this.state.player
        && this.state.board[6] !== '') {
          return 4;
      }
    }
    if (this.state.board[5] === '') {
      if (this.state.board[2] !== this.state.player
        && this.state.board[2] !== ''
        && this.state.board[8] !== this.state.player
        && this.state.board[8] !== '') {
          return 5;
      }
      if (this.state.board[4] !== this.state.player
        && this.state.board[4] !== ''
        && this.state.board[3] !== this.state.player
        && this.state.board[3] !== '') {
          return 5;
      }
    }
    if (this.state.board[6] === '') {
      if (this.state.board[0] !== this.state.player
        && this.state.board[0] !== ''
        && this.state.board[3] !== this.state.player
        && this.state.board[3] !== '') {
          return 6;
      }
      if (this.state.board[7] !== this.state.player
        && this.state.board[7] !== ''
        && this.state.board[8] !== this.state.player
        && this.state.board[8] !== '') {
          return 6;
      }
      if (this.state.board[4] !== this.state.player
        && this.state.board[4] !== ''
        && this.state.board[2] !== this.state.player
        && this.state.board[2] !== '') {
          return 6;
      }
    }
    if (this.state.board[7] === '') {
      if (this.state.board[1] !== this.state.player
        && this.state.board[1] !== ''
        && this.state.board[4] !== this.state.player
        && this.state.board[4] !== '') {
          return 7;
      }
      if (this.state.board[6] !== this.state.player
        && this.state.board[6] !== ''
        && this.state.board[8] !== this.state.player
        && this.state.board[8] !== '') {
          return 7;
      }
    }
    if (this.state.board[8] === '') {
      if (this.state.board[2] !== this.state.player
        && this.state.board[2] !== ''
        && this.state.board[5] !== this.state.player
        && this.state.board[5] !== '') {
          return 8;
      }
      if (this.state.board[6] !== this.state.player
        && this.state.board[6] !== ''
        && this.state.board[7] !== this.state.player
        && this.state.board[7] !== '') {
          return 8;
      }
      if (this.state.board[4] !== this.state.player
        && this.state.board[4] !== ''
        && this.state.board[0] !== this.state.player
        && this.state.board[0] !== '') {
          return 8;
      }
    }
    return i;
  }
  // End medium index function

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
       onKeyDown={(key) => !this.state.setting_open && (key.key==='0' || 
       (key.key==='Enter' && this.state.gameOver)?
       this.reset():this.add(CELL_NUMS[Number(key.key)-1]-1))}>
        
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
          <div className='buttons'>
            
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
          {!this.state.setting_open  && !this.state.gameOver
           && <div id="board"
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

          {/* WIN PAGE */}
          { setting_opened = true &&
          !this.state.setting_open && this.state.gameOver && 
          <div id="setting">
            <div className=' winpage-content' id={this.state.language==='en' ? 'eng' : ''} >
              { this.state.language==='en'?
                this.state.winner === 'tie' || this.state.winner === '' ?
                <span>Draw!</span> :
                <span>Player <span id='winner'> {this.state.winner} </span> Won!</span>
                :
                this.state.winner === 'tie' || this.state.winner === '' ?
                <span>!مساوی</span> :
                <span>!برد <span id='winner'> {this.state.winner} </span> بازیکن</span>
                

              }
              <RiRestartFill id='reswon' onClick={()=>this.reset()}/>
            </div>
            

          </div>}
          {/* End Win Page */}

          {/* SETTING */}
          {this.state.setting_open && <div id="setting">
            <div className='theme setting-content' >
              <div className='theme-con'id="theme1" 
              onClick={() => {setTheme(themes[0]);this.setState({themeIndex:0});}}>
                {this.state.themeIndex===0 && <RiBrushFill id='brush'/>}</div>
              <div className='theme-con'id="theme2"
              onClick={() => {setTheme(themes[1]);this.setState({themeIndex:1});}}>
                {this.state.themeIndex===1 && <RiBrushFill id='brush'/>}</div>
              <div className='theme-con'id="theme3"
              onClick={() => {setTheme(themes[2]);this.setState({themeIndex:2});}}>
              {this.state.themeIndex===2 && <RiBrushFill id='brush'/>}</div>

              <RiRestartLine className='theme-con' onClick={() => 
              {this.reset(); this.setState({setting_open:false});
              setting_opened = true; }} id='restart'/>
              

              <RiCloseLine className='theme-con'
              onClick={() => {this.setState({setting_open:false});
              setting_opened = true; }}/>
            </div>

            <div className='game-level'>

              <button style={{ color: this.state.game_level==='easy'
            && 'var(--bg-color)', background: this.state.game_level==='easy'
            && 'var(--select-color' }}
            onClick={()=>{this.setState({game_level:'easy'})}}
            id={this.state.language==='en' ? 'eng' : ''}>
              {this.content[this.state.language]['button1']} </button>
              
              <button style={{ color: this.state.game_level==='medium'
            && 'var(--bg-color)', background: this.state.game_level==='medium'
            && 'var(--select-color' }}
            onClick={()=>{this.setState({game_level:'medium'})}}
            id={this.state.language==='en'  ? 'eng' : ''}>
              {this.content[this.state.language]['button2']}</button>
              
              <button style={{ color: this.state.game_level==='hard'
            && 'var(--bg-color)', background: this.state.game_level==='hard'
            && 'var(--select-color' }}
            onClick={()=>{this.setState({game_level:'hard'})}}
            id={this.state.language==='en'  ? 'eng' : ''}>
                {this.content[this.state.language]['button3']}</button>
            
            </div>

            <div className='game-level language'>
            <button style={{ color: this.state.language==='en'
            && 'var(--bg-color)', background: this.state.language==='en'
            && 'var(--select-color' }}
            onClick={()=>{this.setState({language:'en'})}} id='eng'>
              Enghlish</button>
              <button style={{ color: this.state.language==='fa'
            && 'var(--bg-color)', background: this.state.language==='fa'
            && 'var(--select-color' }}
            onClick={()=>{this.setState({language:'fa'})}}>
              فارسی</button>
            </div>
          </div>}
          {/* End Setting */}

          {/* bottom buttons */}
          <div className='buttons bottombuttons'
           hidden>

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
