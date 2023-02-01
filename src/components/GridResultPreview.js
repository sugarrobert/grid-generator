import React from 'react';
import { useContext, useEffect, useRef } from 'react';
import GridContext from '../context/GridContext';
import GridPreviewItem from './GridPreviewItem';
import { createGridPreviewItem } from '../context/GridActions';

function GridResultPreview() {
    const { gridList, gridItems, gridListStyle, dispatch } =
        useContext(GridContext);
    const shouldSet = useRef(true);

    useEffect(() => {
        if (shouldSet.current) {
            shouldSet.current = false;

            dispatch({
                type: 'SET_GRID_LIST',
                payload: setGridPreviewItems(),
            });
        }
    }, []);

    const setGridPreviewItems = () => {
        for (let i = 0; i < gridItems; i++) {
            const newItem = createGridPreviewItem(i);

            gridList.push(newItem);
        }

        return gridList;
    };

    const setAllGridItems = gridList.map((gridItem, index) => (
        <GridPreviewItem
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
