import React from 'react';
import { nanoid } from 'nanoid';
import { FaPlus } from 'react-icons/fa';

function ListItem(props) {
    return (
        <div className="controls__list__item" id={props.id}>
            <span className="control__text">
                {`${props.name} ${props.index + 1}`}
            </span>
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
                disabled={
                    props.input.dataId === props.options.dataId &&
                    props.options.selected === 'auto'
                }
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
            <button
                aria-label="Delete property"
                title={`Remove ${props.name} Template`}
                className="action remove"
                data-id={props.id}
                onClick={props.deleteGridTemplate}
            >
                <FaPlus className="icon close" />
            </button>
        </div>
    );
}

export default ListItem;
