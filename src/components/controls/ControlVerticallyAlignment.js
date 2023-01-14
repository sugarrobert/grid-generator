import React from 'react';
import { useContext, useEffect } from 'react';
import GridContext from '../../context/GridContext';
import GridAlignment from '../GridAlignment';
import {
    updateGridAlignment,
    onAlignmentValueChange,
} from '../../context/GridActions';

function ControlVerticallyAlignment() {
    const { gridAlign, gridListStyle, dispatch } = useContext(GridContext);

    useEffect(() => {
        dispatch({
            type: 'SET_GRID_LIST_STYLE',
            payload: updateGridAlignment(
                gridAlign,
                'alignItems',
                gridListStyle
            ),
        });
    }, [gridAlign]);

    const setNewAlignAlignment = (e) => {
        dispatch({
            type: 'SET_GRID_VERTICALLY_ALIGNMENT',
            payload: onAlignmentValueChange(e, gridAlign),
        });
    };

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
