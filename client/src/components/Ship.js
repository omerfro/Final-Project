import React from "react";
import '../App.css';

function Ship(props) {

    const ship = [];
    for(let i = 0; i<props.length; i++ ){
        ship.push(<div className={`ship-cell `}></div>)
    }

    return <div className={`ship ${props.status}`}> { ship } </div>
}

export default Ship