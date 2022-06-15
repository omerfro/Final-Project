import React from "react";
import Cell from "./Cell";
import Legend from "./Legend";
import '../App.css';
import { ValueContext } from "./BoardContext";

function Board(props){

    const value = React.useContext(ValueContext);

    function setCurrentCell() {
        if(value.currentCell){
            value.currentCell = null
            clearAvaialbleCells()
            value.placeShip.flag = false
        }
        
    }

    function clearAvaialbleCells(){
        value.availableCells.forEach(cell => {
            document.getElementById(cell)?.classList.remove("available")
        })

        value.availableCells = []
    }

    return <>
        <div className={`${props.owner} ${props.status}`} > 
            <div className={`board-container `} onMouseLeave={setCurrentCell}>
                {
                    props.board_array.map((col,colnum) => 
                        <div> {col.map((cell, rownum) => 
                            <Cell row={rownum} column={colnum} id={`${rownum}${colnum}`} status={cell}> {cell} </Cell>)} 
                        </div>) 
                }
            </div>
            <Legend dispatcher={props.dispatcher}/>
        </div>
    </>
}

export default Board


