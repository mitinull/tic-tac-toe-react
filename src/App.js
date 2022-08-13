import './App.css';
import React, { Component } from 'react';
import { MdRestartAlt, MdSettings } from 'react-icons/md';
import {BsPeopleFill, BsPersonFill} from 'react-icons/bs';
import {RiBrushFill, RiCloseLine} from 'react-icons/ri';
import {GiSpeaker,GiSpeakerOff} from 'react-icons/gi';



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
    setting_open: true,
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

              {this.state.sound_on? <GiSpeaker className='theme-con'
              onClick={() => {this.setState({sound_on:false})}}/>:
              <GiSpeakerOff className='theme-con'
              onClick={() => {this.setState({sound_on:true})}}/>}

              <RiCloseLine className='theme-con'
              onClick={() => {this.setState({setting_open:false});
              setting_opened = true; }}/>
            </div>

            <div className='game-level'>

              <button style={{ color: this.state.game_level==='easy'
            && 'var(--bg-color)', background: this.state.game_level==='easy'
            && 'var(--select-color' }}
            onClick={()=>{this.setState({game_level:'easy'})}}
            id={this.state.language==='en' && 'eng'}>
              {this.content[this.state.language]['button1']} </button>
              
              <button style={{ color: this.state.game_level==='medium'
            && 'var(--bg-color)', background: this.state.game_level==='medium'
            && 'var(--select-color' }}
            onClick={()=>{this.setState({game_level:'medium'})}}
            id={this.state.language==='en' && 'eng'}>
              {this.content[this.state.language]['button2']}</button>
              
              <button style={{ color: this.state.game_level==='hard'
            && 'var(--bg-color)', background: this.state.game_level==='hard'
            && 'var(--select-color' }}
            onClick={()=>{this.setState({game_level:'hard'})}}
            id={this.state.language==='en' && 'eng'}>
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
