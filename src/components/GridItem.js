import React from 'react';
import { useState, useContext } from 'react';
import GridContext from '../context/GridContext';
import { FiSettings } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';

function GridItem(props) {
    const [isShown, setIsShown] = useState(false);

    const { gridList, dispatch } = useContext(GridContext);

    const itemStyle = {
        gridColumnStart: `span ${props.columnStart.value}`,
        gridRowStart: `span ${props.rowStart.value}`,
    };

    const onItemValueChange = (e) => {
        const { id, value } = e.target;
        const rowSpan = e.target.classList.contains('row__value');
        const columnSpan = e.target.classList.contains('column__value');

        const updateValue = gridList.map((item) => {
            if (columnSpan) {
                if (id === item.columnStart.id) {
                    item.columnStart.value = value;
                }
            } else if (rowSpan) {
                if (id === item.rowStart.id) {
                    item.rowStart.value = value;
                }
            }

            return item;
        });

        dispatch({ type: 'SET_GRID_LIST', payload: updateValue });
    };

    return (
        <li
            key={props.id}
            id={props.id}
            className={props.class}
            style={itemStyle}
        >
            <span>{props.index + 1}</span>
            {!isShown ? (
                <button
                    className="action icon settings"
                    onClick={() => setIsShown(true)}
                >
                    <FiSettings />
                </button>
            ) : (
                <button
                    className="action icon settings close"
                    onClick={() => setIsShown(false)}
                >
                    <FaPlus />
                </button>
            )}

            {isShown && (
                <div className="item-stretch__options">
                    <div className="grid-item__span__input--container">
                        <label
                            htmlFor={props.columnStart.id}
                            className="grid-item__span__label"
                        >
                            {`Grid column span`}
                        </label>
                        <input
                            id={props.columnStart.id}
                            placeholder="1"
                            type="number"
                            min="1"
                            value={props.columnStart.value}
                            aria-label="{`Grid Template ${props.name} amount`}"
                            className="input column__value"
                            onChange={onItemValueChange}
                        />
                    </div>
                    <div className="grid-item__span__input--container">
                        <label
                            htmlFor={props.rowStart.id}
                            className="grid-item__span__label"
                        >
                            {`Grid row span`}
                        </label>
                        <input
                            id={props.rowStart.id}
                            placeholder="1"
                            type="number"
                            min="1"
                            value={props.rowStart.value}
                            aria-label="{`Grid Template ${props.name} amount`}"
                            className="input row__value"
                            onChange={onItemValueChange}
                        />
                    </div>
                </div>
            )}
        </li>
    );
}

export default GridItem;
