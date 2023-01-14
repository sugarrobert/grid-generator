import React from 'react';
import { useContext } from 'react';
import GridContext from '../../context/GridContext';

function ControlGridItem() {
    const { gridItems, dispatch } = useContext(GridContext);

    const addElement = () => {
        dispatch({ type: 'SET_GRID_ITEMS', payload: gridItems + 1 });
    };

    const removeElement = () => {
        dispatch({ type: 'SET_GRID_ITEMS', payload: gridItems - 1 });
    };

    return (
        <section className="control-field__section">
            <h2 className="control-field__title">
                Add or Remove elements within the grid
            </h2>
            <div className="controls__container">
                <button className="action add" onClick={addElement}>
                    +
                </button>
                <button className="action remove" onClick={removeElement}>
                    -
                </button>
            </div>
        </section>
    );
}

export default ControlGridItem;
