import React from "react";
import Cell from "./Cell";
import Legend from "./Legend";
import '../App.css';

function Board(props){

    return <>
        <div className={`${props.owner} ${props.status}`}> 
            <div className={`board-container `} >
                {
                    props.board_array.map(row => 
                        <div> {row.map(cell => 
                            <Cell status={cell}> {cell} </Cell>)} 
                        </div>) 
                }
            </div>
            <Legend dispatcher={props.dispatcher}/>
        </div>
    </>
}

export default Board