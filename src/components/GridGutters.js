import React from 'react';
import { nanoid } from 'nanoid';

function GridGutters(props) {
    return (
        <div className="controls__list__item" id={props.id}>
            <label
                htmlFor={props.input.id}
                className="no-display"
            >{`Grid Template ${props.name} amount`}</label>
            <input
                id={props.input.id}
                placeholder="1"
                type="number"
                min="1"
                value={props.input.value}
                aria-label={`Grid Template ${props.name} amount`}
                className="input column__value"
                onChange={props.onValueChange}
            />
            <label
                htmlFor={props.options.id}
                className="no-display"
            >{`Grid Template ${props.name} unit`}</label>
            <select
                id={props.options.id}
                className="column__value"
                aria-label={`Grid Template ${props.name} unit`}
                value={props.options.selected}
                onChange={props.onValueChange}
            >
                {props.options.option.map((option) => (
                    <option key={nanoid()} val={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default GridGutters;
