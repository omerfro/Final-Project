import React from "react";
import Ship from "./Ship";
import '../App.css';

function Legend(props) {
    return <>
        <div className="legend-container">
            <Ship length="1" />
            <Ship length="1" />
            <Ship length="1" />
            <Ship length="1" />
            <Ship length="2" />
            <Ship length="2" />
            <Ship length="2" />
            <Ship length="3" />
            <Ship length="3" />
            <Ship length="4" />
        </div>
    </>
}

export default Legend