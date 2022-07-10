import React from "react";
import '../App.css';
import {ValueContext} from './context'

function Ship(props) {

    const { dispatch } = React.useContext(ValueContext);

    const [status,setStatus] = React.useState('')

    const placeShip = () => {
        let temp_ship = {length: null, id:null, positions: [], hits: 0}
        if(props.owner === 'user'){
            if(!temp_ship.id){
                setStatus('selected')
                temp_ship.length = props.length
                temp_ship.id = props.id
            }else {
                setStatus('')
                temp_ship.id = null
                temp_ship.length = null
            }
        }
        dispatch({type: 'current_ship', payload: temp_ship})    
        
    }

    const ship = [];
    for(let i = 0; i<props.length; i++ ){
        ship.push(<div key={`${props.id}-${i}`} className={`ship-cell `}></div>)
    }

    return <div key={props.id} id={`${props.id}-${props.owner}`} className={`ship ${status}`} onClick={placeShip}> { ship } </div>
}

export default Ship


/*/
    status: 
        alive = placed on board 
        dead = placed on board and dead 
        selected = after click, waiting to be placed
/*/