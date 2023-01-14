import React from 'react';
import { useContext, useEffect } from 'react';
import GridContext from '../../context/GridContext';
import GridAlignment from '../GridAlignment';
import {
    updateGridAlignment,
    onAlignmentValueChange,
} from '../../context/GridActions';

function ControlJustifyAlignment() {
    const { gridJustify, gridListStyle, dispatch } = useContext(GridContext);

    useEffect(() => {
        dispatch({
            type: 'SET_GRID_LIST_STYLE',
            payload: updateGridAlignment(
                gridJustify,
                'justifyItems',
                gridListStyle
            ),
        });
    }, [gridJustify]);

    const setNewJustifyAlignment = (e) => {
        dispatch({
            type: 'SET_GRID_JUSTIFY_ALIGNMENT',
            payload: onAlignmentValueChange(e, gridJustify),
        });
    };

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
