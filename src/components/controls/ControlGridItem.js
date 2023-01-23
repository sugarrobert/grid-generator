import React from 'react';
import { useContext } from 'react';
import GridContext from '../../context/GridContext';
import { FaMinus, FaPlus } from 'react-icons/fa';

function ControlGridItem() {
    const { gridItems, dispatch } = useContext(GridContext);

    const addElement = () => {
        dispatch({ type: 'SET_GRID_ITEMS', payload: gridItems + 1 });
    };

    const removeElement = () => {
        dispatch({ type: 'SET_GRID_ITEMS', payload: gridItems - 1 });
    };

    return (
        <section className="control-field__section grid__add-rem">
            <h2 className="control-field__title">
                Add or Remove elements within the grid
            </h2>
            <div className="controls__container">
                <button className="action add" onClick={addElement}>
                    <FaPlus className="icon" />
                </button>
                <button className="action remove" onClick={removeElement}>
                    <FaMinus />
                </button>
            </div>
        </section>
    );
}

export default ControlGridItem;
