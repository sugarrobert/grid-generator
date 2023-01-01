import React from 'react';
import { useContext } from 'react';
import GridTemplateContext from '../../context/GridTemplateContext';
import GridAlignment from '../GridAlignment';

function ControlVerticallyAlignment() {
    const { gridAlign, setNewAlignAlignment } = useContext(GridTemplateContext);

    return (
        <section className="control-field__section">
            <h2 className="control-field__title">Align Items</h2>
            <p className="control-field__description">
                Defines how the items will be aligned{' '}
                <strong>vertically</strong> in each column.
            </p>
            <div className="controls__container">
                <GridAlignment
                    key={gridAlign.id}
                    id={gridAlign.id}
                    options={gridAlign.options}
                    onValueChange={setNewAlignAlignment}
                />
            </div>
        </section>
    );
}

export default ControlVerticallyAlignment;
