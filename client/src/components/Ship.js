import React from "react";
import '../App.css';

function Ship(props) {

    const [status,setStatus] = React.useState('')

    const placeShip = () => {
        if(status === ''){
            setStatus('selected')
        }

    }

    const ship = [];
    for(let i = 0; i<props.length; i++ ){
        ship.push(<div className={`ship-cell `}></div>)
    }

    return <div className={`ship ${status}`} onClick={placeShip}> { ship } </div>
}

export default Ship


/*/
    status: 
        alive = placed on board 
        dead = placed on board and dead 
        selected = after click, waiting to be placed
/*/