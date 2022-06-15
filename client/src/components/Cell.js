import React from "react";

import {ValueContext} from './BoardContext'

function Cell(props){

    const value = React.useContext(ValueContext);

    const [status,setStatus] = React.useState(props.status)

    function tryHit(){
        
        console.log(value.test)
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
                return 'alive cell'
            case 2:
                return 'cell hit'
            case 3:
                return 'cell miss'
            case 4:
                return 'cell available'
            default:
                return 'cell'
        }
    }

    function setCurrentCell(){
        value.currentCell = {position: props.id, row: props.row, column: props.column}
        console.log(value.currentCell)
        if(value.currentShip && !value.placeShip.flag){
            setStatus(4)
            setStatusForShipCells()
        } else if(value.currentShip && value.placeShip.flag){
            clearCells()
            if(value.placeShip.row === value.currentCell.row){
                if(value.placeShip.position < value.currentCell.position){
                    value.availableCellsToPlace = paintCells(parseInt(value.placeShip.position),parseInt(value.placeShip.position) + parseInt(value.currentShip) , 1, "potential")
                } else {
                    value.availableCellsToPlace = paintCells(parseInt(value.placeShip.position) - parseInt(value.currentShip) + 1,parseInt(value.placeShip.position) + 1, 1, "potential")
                }          
            } else if (value.placeShip.column === value.currentCell.column){
                if(value.placeShip.position < value.currentCell.position){
                    value.availableCellsToPlace = paintCells(parseInt(value.placeShip.position),parseInt(value.placeShip.position) + parseInt(value.currentShip)*10 , 10, "potential")
                } else {
                    value.availableCellsToPlace = paintCells(parseInt(value.placeShip.position) - (parseInt(value.currentShip)-1)*10,parseInt(value.placeShip.position) + 1, 10, "potential")
                }
            } else {
                clearCells()
            }
        }      
    }

    //function to improve
    function setStatusForShipCells(){
        clearAvaialbleCells()
        const tempArray = []
        const beginVer = parseInt(value.currentCell.position) - parseInt(value.currentShip - 1);
        const endVer = parseInt(value.currentCell.position) + parseInt(value.currentShip - 1);
        const beginHor = parseInt(value.currentCell.position) - parseInt(value.currentShip - 1)*10;
        const endHor = parseInt(value.currentCell.position) + parseInt(value.currentShip - 1)*10;

        for(let i=beginVer; i<endVer + 1; i++){
            if(Math.floor(i/10) === Math.floor(value.currentCell.position/10) && i>=10){
                document.getElementById(i)?.classList.add("available")
                tempArray.push(i)
            }
            else if(Math.floor(i/10) === Math.floor(value.currentCell.position/10) &&  i<10){
                document.getElementById(`0${i}`)?.classList.add("available")
                tempArray.push(`0${i}`)
            }
            
            
        }
        for(let i=beginHor; i<endHor + 1; i = i + 10){
            if(i<10){
                document.getElementById(`0${i}`)?.classList.add("available")
                tempArray.push(`0${i}`)
            }
            else if(i%10 === value.currentCell.position%10){
                document.getElementById(i)?.classList.add("available")
                tempArray.push(i)
            }
            
        }

        value.availableCells = tempArray
    }

    //function to export
    function clearAvaialbleCells(){
        value.availableCells.forEach(cell => {
            document.getElementById(cell)?.classList.remove("available")
        })

        value.availableCells = []
    }

    function clearCells(){
        value.availableCellsToPlace.forEach(cell => {
            document.getElementById(cell)?.classList.remove("potential")
        })

        value.availableCellsToPlace = []
    }
    
    function paintCells(start,end,jump,name){
        console.log(start,end,jump,name)
        const tempArray = []
        for(let i = start; i < end; i = i + jump){
            if(i<10){
                document.getElementById(`0${i}`)?.classList.add(name)
                tempArray.push(`0${i}`)
            } else {
                document.getElementById(i)?.classList.add(name)
                tempArray.push(i)
                
            }
           
        }
        return tempArray
    }

    function cellSelected(){
        if(value.currentShip && !value.placeShip.flag){
            value.placeShip = {flag: true, position: value.currentCell.position, row:value.currentCell.row, column:value.currentCell.column}
            console.log(value.placeShip)
        } else if (value.placeShip.flag){
            if(value.availableCellsToPlace.length > 0)
                placeShip()
        } else {
            tryHit()
        }
    }

    function placeShip(){
        value.availableCellsToPlace.forEach(cell => {
            document.getElementById(cell).classList.add('alive')
            const cellRow = Math.floor(cell/10)
            const cellCol = cell%10
            value.my_array[cellRow][cellCol] = 1
        })
        clearAvaialbleCells()
        clearCells()
    }

    return <>
        <div id={props.id} className={checkCell()} onClick={cellSelected} onMouseOver={setCurrentCell}></div>
    </>
}

export default Cell;


/*/
    status: 
        0 = initial state
        1 = alive ship 
        2 = hit ship
        3 = miss
        4 = available cell to put ship

/*/