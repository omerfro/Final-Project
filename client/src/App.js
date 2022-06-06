import './App.css';
import './components/Board'
import './index.css';
import Board from './components/Board';

function App() {
  

  return (
    <div className="App">
      <div className='game'>
        <Board status="enabled" />
        <Board status="disabled" />
      </div>
    </div>
  );
}

export default App;
