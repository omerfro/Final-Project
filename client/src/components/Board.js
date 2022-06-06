import React from "react";
import Cell from "./Cell";
import Legend from "./Legend";
import '../App.css';

function Board(props){

    let rows = [];
    for(let y=0; y<10; y++) {
        const cells = [];
        for(let x=0; x<10; x++) {
            cells.push(<Cell cellKey={`${x}${y}`}/>)
        }
        rows.push(<div key={`col-${y}`}>{cells}</div>)
    }

    return <>
        <div> 
            <div className={`board-container ${props.status}`} >{rows}</div>
            <Legend />
        </div>
    </>
}

export default Board