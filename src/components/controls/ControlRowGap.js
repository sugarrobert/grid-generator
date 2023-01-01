import React from 'react';
import { useContext } from 'react';
import GridTemplateContext from '../../context/GridTemplateContext';
import GridGutters from '../GridGutters';

function ControlRowGap() {
    const { gridRowGap, setNewRowGutter } = useContext(GridTemplateContext);

    return (
        <section className="control-field__section">
            <h2 className="control-field__title">Grid Row Gap</h2>
            <p className="control-field__description">
                Defines the horizontal space <strong>between</strong> all rows.
            </p>
            <div className="controls__container">
                <GridGutters
                    key={gridRowGap.id}
                    id={gridRowGap.id}
                    value={gridRowGap.value}
                    input={gridRowGap.input}
                    options={gridRowGap.options}
                    onValueChange={setNewRowGutter}
                />
            </div>
        </section>
    );
}

export default ControlRowGap;
