import React from "react";

import {ValueContext} from './context'

function Cell(props){

    const { state, dispatch } = React.useContext(ValueContext);

    const [ship,setShip] = React.useState(null)


    function tryHit(){
        let temp_array = state.hits_array
        if(props.owner === 'opponent'){
            let hit = false
            let temp_board = state.opponent_array
            let opponent_ships_temp = state.opponent_ships
            if(state.opponent_array[props.row][props.column] === 1){
                temp_board = state.opponent_array
                temp_board[props.row][props.column] = 2
                let shipIndex = getShipByPositionId(props.row,props.column)

                opponent_ships_temp[shipIndex].hits++ 
                if(opponent_ships_temp[shipIndex].hits == opponent_ships_temp[shipIndex].length){
                    document.getElementById(`${opponent_ships_temp[shipIndex].id}-opponent`).classList.add('hit')
                }
                hit = true
                
            } else {
                //setStatus(3)
                temp_board[props.row][props.column] = 3
            }
            temp_array.push(hit)
            dispatch({type:'hit', payload: {opponent_array: temp_board, current_hit: hit, hits_array: temp_array, opponent_ships: opponent_ships_temp}})
        }
        
        
    }

    //replace forEach VVVVV

    function getShipByPositionId(row,column){
        const position = (`${row}${column}`)
        let x = null
        for(let ship of state.opponent_ships){
            for(let pos of ship.positions){
                if(position == pos){
                    x = state.opponent_ships.indexOf(ship) 
                    break
                }
            }
            // if(ship.positions.includes(position)){
            //     x = state.opponent_ships.indexOf(ship) 
            //     break
            // } 
        }
        return x
    }

    function checkShip(ship){
        let bool = true
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
        return state.opponent_array[cellRow][cellCol]
    }

    function checkCell(){
        let board = (props.owner === 'user' ? state.my_array : state.opponent_array)
        switch(board[props.row][props.column]){
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
            case 5:
                return 'cell alive hit'
            case 6:
                if(props.owner === 'user')
                    return 'cell disabled'
                return 'cell'
            default:
                return 'cell'
        }
    }

    function setCurrentCell(){
        let temp_array = []
        let temp_cell = {position: props.id, row: props.row, column: props.column}

        if(state.currentShip.id && !state.placeShip.flag){
            //setStatus(4)
            setStatusForShipCells()
        } else if(state.currentShip.id && state.placeShip.flag){
            clearCells()
            if(state.placeShip.row === temp_cell.row){
                if(state.placeShip.position < temp_cell.position){
                    temp_array = paintCells(parseInt(state.placeShip.position),parseInt(state.placeShip.position) + parseInt(state.currentShip.length) , 1, "potential")
                } else {
                    temp_array = paintCells(parseInt(state.placeShip.position) - parseInt(state.currentShip.length) + 1,parseInt(state.placeShip.position) + 1, 1, "potential")
                }          
            } else if (state.placeShip.column === temp_cell.column){
                if(state.placeShip.position < temp_cell.position){
                    temp_array = paintCells(parseInt(state.placeShip.position),parseInt(state.placeShip.position) + parseInt(state.currentShip.length)*10 , 10, "potential")
                } else {
                    temp_array = paintCells(parseInt(state.placeShip.position) - (parseInt(state.currentShip.length)-1)*10,parseInt(state.placeShip.position) + 1, 10, "potential")
                }
            } else {
                clearCells()
            }
        }
        dispatch({type:'set_current_cell', payload: {currentCell: temp_cell, availableCells: temp_array} })
    }

    //function to improve
    function setStatusForShipCells(){
        clearAvaialbleCells()
        const currentCell = {position: props.id, row: props.row, column: props.column}
        const tempArray = []
        const beginVer = parseInt(currentCell.position) - parseInt(state.currentShip.length - 1);
        const endVer = parseInt(currentCell.position) + parseInt(state.currentShip.length - 1);
        const beginHor = parseInt(currentCell.position) - parseInt(state.currentShip.length - 1)*10;
        const endHor = parseInt(currentCell.position) + parseInt(state.currentShip.length - 1)*10;


        for(let i=beginVer; i<endVer + 1; i++){
            if(Math.floor(i/10) === Math.floor(currentCell.position/10) && i>=10){
                if(state.unavailableCells.includes(i)){
                    document.getElementById(i)?.classList.add("unavailable")
                } else {
                    document.getElementById(i)?.classList.add("available")
                }
                tempArray.push(i)
            }
            else if(Math.floor(i/10) === Math.floor(currentCell.position/10) &&  i<10){
                if(state.unavailableCells.includes(`0${i}`)){
                    document.getElementById(`0${i}`)?.classList.add("unavailable")
                } else {
                    document.getElementById(`0${i}`)?.classList.add("available")
                }
                tempArray.push(`0${i}`)
            }
                   
        }

        for(let i=beginHor; i<endHor + 1; i = i + 10){
            if(i<10){
                if(state.unavailableCells.includes(`0${i}`)){
                    document.getElementById(`0${i}`)?.classList.add("unavailable")
                }
                else {
                    document.getElementById(`0${i}`)?.classList.add("available")
                }
                tempArray.push(`0${i}`)
            }
            else if(i%10 === currentCell.position%10){
                if(state.unavailableCells.includes(i)){
                    document.getElementById(i)?.classList.add("unavailable")
                }
                else{
                    document.getElementById(i)?.classList.add("available")
                }
                tempArray.push(i)
            }
            
        }
        dispatch({type:'available_cells_to_place',payload: tempArray})
    }

    //functions to export
    function clearAvaialbleCells(){
        state.availableCells.forEach(cell => {
            document.getElementById(cell)?.classList.remove("available")
            document.getElementById(cell)?.classList.remove("unavailable")
        })

        dispatch({type:'available_cells_to_place', payload:[]})
    }

    function clearCells(){
        state.availableCellsToPlace.forEach(cell => {
            document.getElementById(cell)?.classList.remove("potential")
        })
    }
    
    function paintCells(start,end,jump,name){
        const tempArray = []
        if(name === 'potential'){
            for(let i = start; i < end; i = i + jump){
                if(state.unavailableCells.includes(i)){
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
        if(state.currentShip.id && !state.placeShip.flag){
            let temp_ship = {flag: true, position: state.currentCell.position, row:state.currentCell.row, column:state.currentCell.column}
            //value.placeShip = {flag: true, position: value.currentCell.position, row:value.currentCell.row, column:value.currentCell.column}
            dispatch({type:'cell_selected', payload: temp_ship})
        } else if (state.placeShip.flag){
            if(state.availableCellsToPlace.length > 0)
                placeShip()
        } else {
            tryHit()
        }
    }

    function placeShip(){
        let temp_array = state.my_array
        let temp_ship = state.currentShip
        let temp_unavailable_cells = state.unavailableCells
        let temp_ships_array = state.ships

        state.availableCellsToPlace.forEach(cell => {
            document.getElementById(cell).classList.add('alive')
            let cellRow = Math.floor(cell/10)
            let cellCol = cell%10
            
            temp_array[cellRow][cellCol] = 1
            temp_ship.positions.push(cell)
            temp_unavailable_cells.push(cell)
            setShip(state.currentShip.id)
        })

        temp_ships_array.push(temp_ship)
        
        clearAvaialbleCells()
        clearCells()
        document.getElementById(`${state.currentShip.id}-user`).classList.remove('selected')
        document.getElementById(`${state.currentShip.id}-user`).classList.add('disabled')

        getNeighboursByShip(state.currentShip).forEach(cell => {
            //document.getElementById(cell).classList.add('disabled')
            temp_unavailable_cells.push(cell)
            let cellRow = Math.floor(cell/10)
            let cellCol = cell%10
            temp_array[cellRow][cellCol] = 6
        })

        dispatch({type: 'place_ship', payload: {my_array: temp_array,increase: 1, ships: temp_ships_array, unavailableCells: temp_unavailable_cells}})

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
        <div key={props.id} id={props.id} className={checkCell()} onClick={cellSelected} onMouseOver={setCurrentCell}></div>
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