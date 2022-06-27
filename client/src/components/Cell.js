import React from "react";

import {ValueContext} from './BoardContext'

function Cell(props){

    const value = React.useContext(ValueContext);

    const [status,setStatus] = React.useState(props.status)
    const [ship,setShip] = React.useState(null)


    function tryHit(){
        if(props.owner === 'opponent'){
            if(value.opponent_array[props.row][props.column] === 1){
                setStatus(2)
                value.opponent_array[props.row][props.column] = 2
                const currentShip = getShipByPositionId(props.row,props.column)
                console.log(currentShip)
                if(checkShip(currentShip)){
                    getNeighboursByShip(currentShip).forEach(cell => {
                        document.getElementById(cell).classList.add('disabled')
                    })
                }
            } else {
                setStatus(3)
            }
        }
    }

    //replace forEach VVVVV

    function getShipByPositionId(row,column){
        const position = parseInt(`${props.row}${props.column}`)
        let x = null
        value.ships.forEach(ship => {
            if(ship.positions.includes(position)){
                x = ship 
            } 
        })
        return x
    }

    function checkShip(ship){
        let bool = true
        console.log(ship)
        ship.positions.forEach(pos => {
            if(checkCellValue(pos) !== 2){
                bool = false
            }
        })
        return bool
    }

    function checkCellValue(cell){
        const cellRow = Math.floor(cell/10)
        const cellCol = cell%10
        return value.opponent_array[cellRow][cellCol]
    }

    function checkCell(){
        switch(status){
            case 0:
                return 'cell'
            case 1:
                if(props.owner === 'user')
                    return 'alive cell'
                else return 'cell'
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
        if(value.currentShip.id && !value.placeShip.flag){
            setStatus(4)
            setStatusForShipCells()
        } else if(value.currentShip.id && value.placeShip.flag){
            clearCells()
            if(value.placeShip.row === value.currentCell.row){
                if(value.placeShip.position < value.currentCell.position){
                    value.availableCellsToPlace = paintCells(parseInt(value.placeShip.position),parseInt(value.placeShip.position) + parseInt(value.currentShip.length) , 1, "potential")
                } else {
                    value.availableCellsToPlace = paintCells(parseInt(value.placeShip.position) - parseInt(value.currentShip.length) + 1,parseInt(value.placeShip.position) + 1, 1, "potential")
                }          
            } else if (value.placeShip.column === value.currentCell.column){
                if(value.placeShip.position < value.currentCell.position){
                    value.availableCellsToPlace = paintCells(parseInt(value.placeShip.position),parseInt(value.placeShip.position) + parseInt(value.currentShip.length)*10 , 10, "potential")
                } else {
                    value.availableCellsToPlace = paintCells(parseInt(value.placeShip.position) - (parseInt(value.currentShip.length)-1)*10,parseInt(value.placeShip.position) + 1, 10, "potential")
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
        const beginVer = parseInt(value.currentCell.position) - parseInt(value.currentShip.length - 1);
        const endVer = parseInt(value.currentCell.position) + parseInt(value.currentShip.length - 1);
        const beginHor = parseInt(value.currentCell.position) - parseInt(value.currentShip.length - 1)*10;
        const endHor = parseInt(value.currentCell.position) + parseInt(value.currentShip.length - 1)*10;

        for(let i=beginVer; i<endVer + 1; i++){
            if(Math.floor(i/10) === Math.floor(value.currentCell.position/10) && i>=10){
                if(value.unavailableCells.includes(i)){
                    document.getElementById(i)?.classList.add("unavailable")
                } else {
                    document.getElementById(i)?.classList.add("available")
                }
                tempArray.push(i)
            }
            else if(Math.floor(i/10) === Math.floor(value.currentCell.position/10) &&  i<10){
                if(value.unavailableCells.includes(`0${i}`)){
                    document.getElementById(`0${i}`)?.classList.add("unavailable")
                } else {
                    document.getElementById(`0${i}`)?.classList.add("available")
                }
                tempArray.push(`0${i}`)
            }
                   
        }

        for(let i=beginHor; i<endHor + 1; i = i + 10){
            if(i<10){
                if(value.unavailableCells.includes(`0${i}`)){
                    document.getElementById(`0${i}`)?.classList.add("unavailable")
                }
                else {
                    document.getElementById(`0${i}`)?.classList.add("available")
                }
                tempArray.push(`0${i}`)
            }
            else if(i%10 === value.currentCell.position%10){
                if(value.unavailableCells.includes(i)){
                    document.getElementById(i)?.classList.add("unavailable")
                }
                else{
                    document.getElementById(i)?.classList.add("available")
                }
                tempArray.push(i)
            }
            
        }
        value.availableCells = tempArray
    }

    //functions to export
    function clearAvaialbleCells(){
        value.availableCells.forEach(cell => {
            document.getElementById(cell)?.classList.remove("available")
            document.getElementById(cell)?.classList.remove("unavailable")
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
        const tempArray = []
        if(name === 'potential'){
            for(let i = start; i < end; i = i + jump){
                if(value.unavailableCells.includes(i)){
                    return tempArray
                }
            }
        }
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
        if(value.currentShip.id && !value.placeShip.flag){
            value.placeShip = {flag: true, position: value.currentCell.position, row:value.currentCell.row, column:value.currentCell.column}
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
            value.currentShip.positions.push(cell)
            value.unavailableCells.push(cell)
            setShip(value.currentShip.id)
        })
        
        clearAvaialbleCells()
        clearCells()
        document.getElementById(value.currentShip.id).classList.remove('selected')
        document.getElementById(value.currentShip.id).classList.add('disabled')

        getNeighboursByShip(value.currentShip).forEach(cell => {
            document.getElementById(cell).classList.add('disabled')
            value.unavailableCells.push(cell)
        })

        value.ships.push(value.currentShip)
        value.currentShip = {length: null,id:null, positions: []}
        value.shipPlaced++

        if(value.shipPlaced > 9){
            value.opponent_array = value.my_array
            console.log(value.ships)
            props.start()
        }
    }

    function getNeighboursByShip(ship){
        const shipCells = ship.positions
        const neighboursCells = []
        
        shipCells.forEach(cell => {
            //add handle with first line (0)
            cell = parseInt(cell)
            let positions = []
            if(cell%10 === 0){positions = [cell - 10, cell - 9, cell + 1, cell + 10, cell + 11]}
            else if(cell%10 === 9){positions = [cell - 1, cell - 11, cell - 10,  cell + 9, cell + 10]}
            else{positions = [cell - 1, cell - 11, cell - 10, cell - 9, cell + 1, cell + 9, cell + 10, cell + 11]}
            // let left = cell - 1, leftUp = cell - 11, up = cell - 10, rightUp = cell - 9, right = cell + 1, rigthDown = cell + 11, down = cell = 10, leftDown = cell + 9;
            positions.forEach(pos => {
                let posCopy = pos
                if(pos < 10){
                    posCopy = `0${pos}`
                }
                if(document.getElementById(posCopy) && !neighboursCells.includes(posCopy) && !shipCells.includes(posCopy)) {neighboursCells.push(posCopy) }
            })
            
        })
        
        return neighboursCells
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