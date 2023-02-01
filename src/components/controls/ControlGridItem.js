import React from 'react';
import { useContext } from 'react';
import GridContext from '../../context/GridContext';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { createGridPreviewItem } from '../../context/GridActions';

function ControlGridItem() {
    const { gridItems, gridList, dispatch } = useContext(GridContext);

    const addNewGridPreviewItem = () => {
        gridList.push(createGridPreviewItem(gridList.length));

        return gridList;
    };

    const removeGridPreviewItem = () => {
        gridList.pop();

        return gridList;
    };

    const addElement = () => {
        dispatch({ type: 'SET_GRID_ITEMS', payload: gridItems + 1 });
        dispatch({
            type: 'SET_GRID_LIST',
            payload: addNewGridPreviewItem(),
        });
    };

    const removeElement = () => {
        dispatch({ type: 'SET_GRID_ITEMS', payload: gridItems - 1 });
        dispatch({
            type: 'SET_GRID_LIST',
            payload: removeGridPreviewItem(),
        });
    };

    return (
        <section className="control-field__section grid__add-rem">
            <h2 className="control-field__title">
                Add or Remove elements within the grid
            </h2>
            <div className="controls__container">
                <button
                    className="action add"
                    onClick={addElement}
                    title="Add grid item"
                >
                    <FaPlus className="icon" />
                </button>
                <button
                    className="action remove"
                    onClick={removeElement}
                    title="Remove grid item"
                >
                    <FaMinus />
                </button>
            </div>
        </section>
    );
}

export default ControlGridItem;
