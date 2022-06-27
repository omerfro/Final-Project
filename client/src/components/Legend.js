import React from "react";
import Ship from "./Ship";
import '../App.css';

function Legend(props) {
    return <>
        <div className="legend-container">
            <Ship length="1" id={`S-${1}`} owner={props.owner}/>
            <Ship length="1" id={`S-${2}`} owner={props.owner}/>
            <Ship length="1" id={`S-${3}`} owner={props.owner}/>
            <Ship length="1" id={`S-${4}`} owner={props.owner}/>
            <Ship length="2" id={`S-${5}`} owner={props.owner}/>
            <Ship length="2" id={`S-${6}`} owner={props.owner}/>
            <Ship length="2" id={`S-${7}`} owner={props.owner}/>
            <Ship length="3" id={`S-${8}`} owner={props.owner}/>
            <Ship length="3" id={`S-${9}`} owner={props.owner}/>
            <Ship length="4" id={`S-${10}`} owner={props.owner}/>
        </div>
    </>
}

export default Legend