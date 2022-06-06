import React from "react";

function Cell(props){

    const [isActive,setActive] = React.useState(false)
    const [hit,setHit] = React.useState(false)

    const tryHit = () => {
        if(!isActive){
            const num = Math.random();
            if(num > 0.5){
                setHit(true)
            }
            setActive(true)
            }
    }


    return <>
        <div key={props.cellKey} className={!isActive ? 'cell' : (hit ? 'cell hit' : 'cell miss') } onClick={tryHit}></div>
    </>
}

export default Cell;