import React from "react";
import Cell from "./Cell";
import Legend from "./Legend";
import '../App.css';
import { ValueContext } from "./context";

function Board(props){

    const { state, dispatch } = React.useContext(ValueContext);

    function board_array(){
        if(props.owner === 'user') return state.my_array
        else return state.opponent_array
    }

    function setCurrentCell() {
        if(state.currentCell){
            //value.currentCell = null
            //value.placeShip.flag = false
            let temp_ship = state.placeShip
            temp_ship.flag = false
            dispatch({type: 'mouse_leave_board', payload: {cell: {position: null, row: null, column: null}, ship: temp_ship} })
            clearAvaialbleCells()
            dispatch({type: 'available_cells',payload: []})
        }
        
    }

    function clearAvaialbleCells(){
        state.availableCells.forEach(cell => {
            document.getElementById(cell)?.classList.remove("available")
        })

        //value.availableCells = []
        //dispatcher.dispatch({type: 'available_cells', payload: null}) // see function above
    }

    return <>
        <div id={`${props.owner}-board`} className={`${props.owner} ${props.status}`} > 
            <div className={`board-container `} onMouseLeave={setCurrentCell}>
                {
                    board_array().map((col,colnum) => 
                        <div key={`${colnum}`}> {col.map((cell, rownum) => 
                            <Cell key={`${rownum}${colnum}`} row={rownum} column={colnum} id={`${rownum}${colnum}`} owner={props.owner} > {cell} </Cell>)} 
                        </div>) 
                }
            </div>
            <Legend owner={props.owner}/>
        </div>
    </>
}

export default Board


