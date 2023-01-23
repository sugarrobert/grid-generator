import React from 'react';
import { useContext, useEffect } from 'react';
import GridContext from '../../context/GridContext';
import GridGutters from '../GridGutters';
import {
    updateGridGuttersStyle,
    onGutterValueChange,
} from '../../context/GridActions';

function ControlColumnGap() {
    const { gridColumnGap, gridListStyle, dispatch } = useContext(GridContext);

    useEffect(() => {
        dispatch({
            type: 'SET_GRID_LIST_STYLE',
            payload: updateGridGuttersStyle(
                gridColumnGap,
                'gridColumnGap',
                gridListStyle
            ),
        });
    }, [gridColumnGap]);

    const setNewColumnGutter = (e) => {
        dispatch({
            type: 'SET_GRID_COLUMN_GAP',
            payload: onGutterValueChange(e, gridColumnGap),
        });
    };

    return (
        <section className="control-field__section">
            <h2 className="control-field__title">Grid Column Gap</h2>
            <p className="control-field__description">
                Defines the horizontal space <strong>between</strong> all
                columns.
            </p>
            <div className="controls__container gutter__controls">
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
