import React from 'react';
import { useContext, useEffect } from 'react';
import GridContext from '../../context/GridContext';
import GridGutters from '../GridGutters';
import {
    updateGridGuttersStyle,
    onGutterValueChange,
} from '../../context/GridActions';

function ControlRowGap() {
    const { gridRowGap, gridListStyle, dispatch } = useContext(GridContext);

    useEffect(() => {
        dispatch({
            type: 'SET_GRID_LIST_STYLE',
            payload: updateGridGuttersStyle(
                gridRowGap,
                'gridRowGap',
                gridListStyle
            ),
        });
    }, [gridRowGap]);

    const setNewRowGutter = (e) => {
        dispatch({
            type: 'SET_GRID_ROW_GAP',
            payload: onGutterValueChange(e, gridRowGap),
        });
    };

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
