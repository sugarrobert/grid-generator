import React from 'react';
import { useContext, useEffect } from 'react';
import GridContext from '../context/GridContext';
import { nanoid } from 'nanoid';

function GridItem() {
    const { gridList, gridItems, gridListStyle, dispatch } =
        useContext(GridContext);

    useEffect(() => {
        const newArray = [];
        for (let i = 0; i < gridItems; i++) {
            const item = {
                id: nanoid(),
                class: 'grid__item',
            };

            newArray.push(item);
        }
        dispatch({ type: 'SET_GRID_LIST', payload: newArray });
    }, [gridItems]);

    const setAllGridItems = gridList.map((gridItem, index) => (
        <li key={gridItem.id} id={gridItem.id} className={gridItem.class}>
            {index + 1}
        </li>
    ));

    return (
        <section className="preview result__preview">
            <ul className="grid__list" id="grid__list" style={gridListStyle}>
                {setAllGridItems}
            </ul>
        </section>
    );
}

export default GridItem;
