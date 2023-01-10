import React from 'react';
import { useContext } from 'react';
import GridContext from '../../context/GridContext';
import GridGutters from '../GridGutters';

function ControlColumnGap() {
    const { gridColumnGap, setNewColumnGutter } = useContext(GridContext);

    return (
        <section className="control-field__section">
            <h2 className="control-field__title">Grid Column Gap</h2>
            <p className="control-field__description">
                Defines the horizontal space <strong>between</strong> all
                columns.
            </p>
            <div className="controls__container">
                <GridGutters
                    key={gridColumnGap.id}
                    id={gridColumnGap.id}
                    value={gridColumnGap.value}
                    input={gridColumnGap.input}
                    options={gridColumnGap.options}
                    onValueChange={setNewColumnGutter}
                />
            </div>
        </section>
    );
}

export default ControlColumnGap;
