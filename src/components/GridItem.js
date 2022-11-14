import React from "react";

function GridItem(props) {
    return (
        <li 
            key={props.id}
            id={props.id}
            className={props.class}
        >{props.index + 1}</li>
    )
}

export default GridItem;