import React from "react";

export const ValueContext = React.createContext();

function reducer(state, action){
  switch(action.type){
    case 'start':
      return {
        ...state,
        game_start: action.payload
      }
    case 'set_current_cell':
      return {
        ...state,
        currentCell: action.payload.currentCell,
        availableCellsToPlace: action.payload.availableCells
      }
    case 'mouse_leave_board':
      return {
        ...state,
        currentCell: action.payload.cell,
        currentShip: action.payload.ship
      }
    case 'cell_selected':
      return {
        ...state,
        placeShip: action.payload
      }
    case 'available_cells_to_place':
      return {
        ...state,
        availableCells: action.payload
      }
    case 'unavaialble_cells':
      return {
        ...state,
        unavailableCells: action.payload
      }
    case 'ships':
      return {
        ...state,
        ships: action.payload
      }
    case 'current_ship':
      return {
        ...state,
        currentShip: action.payload
      }
    case 'change_my_array':
      return {
        ...state,
        my_array: action.payload
      }
    case 'change_opponent_array':
      return {
        ...state,
        opponent_array: action.payload
      }
    case 'initiate_opponent_data':
      return {
        ...state,
        opponent_array: action.payload.opponent_board,
        opponent_ships: action.payload.opponent_ships
      }
    case 'hit':
      let increase = (action.payload.current_hit ? 1 : 0)
      let end = (state.number_of_hits + increase >= 20 ? true : false)
      return {
        ...state,
        opponent_array: action.payload.opponent_array,
        current_hit: action.payload.current_hit,
        hits_array: action.payload.hits_array,
        number_of_hits: state.number_of_hits + increase,
        game_end: end,
        opponent_ships: action.payload.opponent_ships
      }
    case 'place_ship':
      let start = (state.shipPlaced + action.payload.increase > 9) ? true : false
      let board = action.payload.my_array
      return {
        ...state,
        my_array: board,
        shipPlaced: state.shipPlaced + action.payload.increase,
        ships: action.payload.ships,
        unavailableCells: action.payload.unavailableCells,
        game_start: start
      }
    case 'change_turn':
      return {
        ...state,
        my_turn: !(state.my_turn)
      }
    default:
      return state;
  }
}

export default function ValueContextProvider({children}) {

  const [state, dispatch] = React.useReducer(reducer, boards)


  return <ValueContext.Provider value={ {state, dispatch} } >
    { children }
  </ValueContext.Provider>
}

const boards = {
    game_start: false,
    game_end: false,
    shipPlaced: 0,
    currentCell: {position: null, row: null, column: null},
    currentShip: {length: null, id:null, positions: [], hits: 0},
    availableCells: [],
    availableCellsToPlace: [],
    placeShip: {flag:false, position: null, row:null, column:null},
    unavailableCells: [],
    ships: [],
    opponent_ships: [],
    my_turn: false,
    current_hit: false,
    hits_array: [],
    number_of_hits: 0,
    my_array: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    opponent_array: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }

