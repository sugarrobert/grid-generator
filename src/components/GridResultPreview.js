import React from 'react';
import { useContext, useEffect } from 'react';
import GridContext from '../context/GridContext';
import GridItem from './GridItem';

function GridResultPreview() {
    const { gridList, gridItems, gridListStyle, dispatch } =
        useContext(GridContext);

    useEffect(() => {
        const newArray = [];
        for (let i = 0; i < gridItems; i++) {
            let itemNum = `grid__item--${i + 1}`;
            const item = {
                id: itemNum,
                class: `grid__item ${itemNum}`,
                columnStart: {
                    id: `column__${itemNum}`,
                    value: 1,
                },
                rowStart: {
                    id: `row__${itemNum}`,
                    value: 1,
                },
            };

            newArray.push(item);
        }
        dispatch({ type: 'SET_GRID_LIST', payload: newArray });
    }, [gridItems]);

    const setAllGridItems = gridList.map((gridItem, index) => (
        <GridItem
            key={gridItem.id}
            id={gridItem.id}
            class={gridItem.class}
            index={index}
            columnStart={gridItem.columnStart}
            rowStart={gridItem.rowStart}
        />
    ));

    return (
        <section className="preview result__preview">
            <ul className="grid__list" id="grid__list" style={gridListStyle}>
                {setAllGridItems}
            </ul>
        </section>
    );
}

export default GridResultPreview;
