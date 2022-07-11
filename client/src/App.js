import './App.css';
import './components/Board'
import './index.css';

import Board from './components/Board';
import {ValueContext} from './components/context'
import socket from './api/socket'

import React, { useRef } from 'react';

function App() {

  const { state, dispatch } = React.useContext(ValueContext);
  const appRendered = useRef(false)


  React.useEffect( () => {

    if(!appRendered.current){
      socket.on("connect", () => {
        console.log('connected!! id:',socket.id)
        dispatch({type: 'player_connect', payload: 1})
      })
      socket.on('start', (data) => {
        dispatch({type:'initiate_opponent_data',payload:{opponent_board: data.my_array, opponent_ships: data.ships}})
      })
      socket.on('change-turn', () => {
        dispatch({type: 'change_turn'})
        document.getElementById('opponent-board').classList.toggle('disabled')
        document.getElementById('opponent-board').classList.toggle('enabled')
      })
      socket.on('hit', (data) => {
        dispatch({type: 'change_my_array', payload: data.opponent_array})
      })
      socket.on('game-end', (data) => {
        console.log(data === 'victory' ? `this is a ${data}` : `you ${data}`)
      })
      socket.on('add-player', (data) =>{
        dispatch({type: 'player_connect', payload: data})
      })
      
      appRendered.current = true
    }

  },[])

  React.useEffect( () => {
    if(state.game_start){
      socket.emit('start',state)
    }
  },[state.game_start])

  React.useEffect( () => {
    if(state.game_end){
      socket.emit('end', state)
    } else if(state.hits_array.length > 0){
      socket.emit('hit', state)
    }
  },[state.hits_array.length])

  function waitingTitle(){
    if(!state.game_start){
      switch(state.players){
        case 1:
          return 'Searching for a battle...'
        case 2:
          return 'Preparing...'
        default:
          return ''
      }
    } else {
      return ''
    }
    
  }

  return (
    <div className="App">
      <span class='title'>BATTLESHIPS

      </span>
      
        <div className='game'>
        <div className="waiting">{waitingTitle()}
 
        </div>
          <Board status="enabled" owner="user" />
          <Board status="disabled" owner="opponent" />
        </div>
    </div>
  );
}

export default App;


//after finish to place ships on my board, all my board become 'pointer-events: none'
//in my turn, opponenet board is become enable 
//in opponenet turn, opponenet's board become 'pointer-events: none'
