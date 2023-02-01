import React from 'react';
import { useState } from 'react';
import GridPreviewItemOptions from './GridPreviewItemOptions';
import { FiSettings } from 'react-icons/fi';

function GridPreviewItem(props) {
    let [shown, setShown] = useState(false);

    const itemStyle = {
        gridColumnStart: `span ${props.columnStart.value}`,
        gridRowStart: `span ${props.rowStart.value}`,
    };

    return (
        <li
            key={props.id}
            id={props.id}
            className={props.class}
            style={itemStyle}
        >
            <span>{props.index + 1}</span>

            <button
                className="action icon settings"
                onClick={() => {
                    setShown(true);
                }}
            >
                <FiSettings />
            </button>

            <GridPreviewItemOptions
                show={shown}
                onClickOutside={() => {
                    setShown(false);
                }}
                columnStart={props.columnStart}
                rowStart={props.rowStart}
            />
        </li>
    );
}

export default GridPreviewItem;
