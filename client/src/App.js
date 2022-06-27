import './App.css';
import './components/Board'
import './index.css';

import {ValueContext} from './components/BoardContext'
import Board from './components/Board';
import boards from './components/context';

import { io } from "socket.io-client";

import React from 'react';

function App() {

  const [game, setGame] = React.useState(false)

  // const boards = {
  //   shipPlaced: 0,
  //   currentCell: {position: null, row: null, column: null},
  //   currentShip: {length: null, id:null, positions: []},
  //   availableCells: [],
  //   availableCellsToPlace: [],
  //   placeShip: {flag:false, position: null, row:null, column:null},
  //   unavailableCells: [],
  //   my_array: [
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   ],
  //   opponent_array: [
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   ]
  // }

  React.useEffect(()=> {
    if(game){
      console.log('hook run')
      const opponenet_board = document.getElementsByClassName('opponent')
      opponenet_board[0].classList.remove('disabled')
      // const socket = io()
      // console.log({socket})
      // //client side
      // socket.on("connect", () => {
      //   console.log('connected!! id:',socket.id)
      // })
    }
  },[game])

  const startGame = ()=> {
    setGame(1)
  }


  return (
    <div className="App">
      <ValueContext.Provider value={boards}>
        <div className='game'>
          <Board status="enabled" owner="user" start={startGame}/>
          <Board status="disabled" owner="opponent" />
        </div>
      </ValueContext.Provider>
    </div>
  );
}

export default App;
