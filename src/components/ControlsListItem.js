import React from "react";

function ControlsListItem(props) {
    const getSelectOptions = () => {
        props.options.option.map(option => {
            <option val={option}>{option}</option>
        })
    }

    return (
        <div className="controls__list__item" id={props.id}>
            <span className="control__text">{props.name}</span>
            <label htmlFor={props.input.id} className="no-display">{`Grid Template ${props.name} amount`}</label>
            <input id={props.input.id}
                placeholder="1" 
                type="number" min="1" value={props.input.value} 
                aria-label="{`Grid Template ${props.name} amount`}" 
                className="input column__value" 
                disabled={ props.input.dataId === props.options.dataId &&  props.options.selected === "auto"}
                onChange={props.onValueChange}/>
            <label htmlFor={props.options.id} className="no-display">{`Grid Template ${props.name} unit`}</label>
            <select id={props.options.id}
                className="column__value" 
                aria-label="{`Grid Template ${props.name} unit`}"
                onChange={props.onValueChange}>
                {
                    props.options.option.map(option => 
                        <option val={option} selected={props.options.selected === option}>{option}</option>
                    )
                }
                
            </select>
            <button aria-label="Delete property" className="action remove" data-id={props.id}>x</button>
        </div>
    )
}

export default ControlsListItem;