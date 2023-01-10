import React from 'react';
import { useContext } from 'react';
import GridContext from '../../context/GridContext';
import GridAlignment from '../GridAlignment';

function ControlJustifyAlignment() {
    const { gridJustify, setNewJustifyAlignment } = useContext(GridContext);

    return (
        <section className="control-field__section">
            <h2 className="control-field__title">Justify Items</h2>
            <p className="control-field__description">
                Defines how the items will be aligned{' '}
                <strong>horizontally</strong> in each column.
            </p>
            <div className="controls__container">
                <GridAlignment
                    key={gridJustify.id}
                    id={gridJustify.id}
                    options={gridJustify.options}
                    onValueChange={setNewJustifyAlignment}
                />
            </div>
        </section>
    );
}

export default ControlJustifyAlignment;
