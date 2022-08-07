import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <div className="title-logo">
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
          <span id="title">Tic-Tac-Toe</span>
        </div>
        <div id="board">
          <div id="cell1" className="cell"><span>7</span></div>
          <div id="cell2" className="cell"><span>8</span></div>
          <div id="cell3" className="cell"><span>9</span></div>
          <div id="cell4" className="cell"><span>4</span></div>
          <div id="cell5" className="cell"><span>5</span></div>
          <div id="cell6" className="cell"><span>6</span></div>
          <div id="cell7" className="cell"><span>1</span></div>
          <div id="cell8" className="cell"><span>2</span></div>
          <div id="cell9" className="cell"><span>3</span></div>
        </div>
      </header>
      
    </div>
  );
}

export default App;
