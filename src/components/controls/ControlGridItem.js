import React from 'react';
import { useContext } from 'react';
import GridTemplateContext from '../../context/GridTemplateContext';

function ControlGridItem() {
    const { addElement, removeElement } = useContext(GridTemplateContext);

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
