import React from "react";

function Cell(props){

    const [status,setStatus] = React.useState(props.status)

    const tryHit = () => {
        const num = Math.random();
            if(num > 0.5){
                setStatus(2)
            } else {
                setStatus(3)
            }
    }

    function checkCell(){
        switch(status){
            case 0:
                return 'cell'
            case 1:
                return 'cell alive'
            case 2:
                return 'cell hit'
            case 3:
                return 'cell miss'
            default:
                return 'cell'
        }
    }


    return <>
        <div className={checkCell()} onClick={tryHit}></div>
    </>
}

export default Cell;


/*/
    status: 
        0 = initial state
        1 = alive ship 
        2 = hit ship
        3 = miss

/*/