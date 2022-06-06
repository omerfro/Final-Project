import React from "react";
import Ship from "./Ship";
import '../App.css';

function Legend(props) {
    return <>
        <div className="legend-container">
            <Ship length="1" dispatcher={props.dispatcher}/>
            <Ship length="1" dispatcher={props.dispatcher}/>
            <Ship length="1" dispatcher={props.dispatcher}/>
            <Ship length="1" dispatcher={props.dispatcher}/>
            <Ship length="2" dispatcher={props.dispatcher}/>
            <Ship length="2" dispatcher={props.dispatcher}/>
            <Ship length="2" dispatcher={props.dispatcher}/>
            <Ship length="3" dispatcher={props.dispatcher}/>
            <Ship length="3" dispatcher={props.dispatcher}/>
            <Ship length="4" dispatcher={props.dispatcher}/>
        </div>
    </>
}

export default Legend