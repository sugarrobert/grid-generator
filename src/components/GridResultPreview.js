import React from 'react';
import { useContext } from 'react';
import GridTemplateContext from '../context/GridTemplateContext';

function GridItem() {
    const { gridList, gridListStyle } = useContext(GridTemplateContext);

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
