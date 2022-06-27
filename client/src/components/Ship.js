import React from "react";
import '../App.css';
import {ValueContext} from './BoardContext'

function Ship(props) {

    const value = React.useContext(ValueContext);

    const [status,setStatus] = React.useState('')

    const placeShip = () => {
        if(props.owner === 'user'){
            if(!value.currentShip.id){
                setStatus('selected')
                value.currentShip.length = props.length
                value.currentShip.id = props.id
            }else {
                setStatus('')
                value.currentShip.id = null
                value.currentShip.length = null
            }
        }    
        
    }

    const ship = [];
    for(let i = 0; i<props.length; i++ ){
        ship.push(<div className={`ship-cell `}></div>)
    }

    return <div id={props.id} className={`ship ${status}`} onClick={placeShip}> { ship } </div>
}

export default Ship


/*/
    status: 
        alive = placed on board 
        dead = placed on board and dead 
        selected = after click, waiting to be placed
/*/