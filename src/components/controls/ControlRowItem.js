import React from 'react';
import { useContext, useEffect } from 'react';
import GridContext from '../../context/GridContext';
import ListItem from '../ListItem';
import { FaPlus } from 'react-icons/fa';
import {
    createNewTemplateItem,
    updateGridTemplate,
    deleteGridTemplate,
    onValueChange,
    updateGridTemplateStyle,
} from '../../context/GridActions';

function ControlRowItem() {
    const { templateRows, templateRowsList, gridListStyle, dispatch } =
        useContext(GridContext);

    useEffect(() => {
        const newArray = [];
        if (templateRowsList.length === 0) {
            for (let i = 0; i < templateRows; i++) {
                const newItem = createNewTemplateItem();
                newArray.push(newItem);
            }
            dispatch({ type: 'SET_GRID_ROWS_ITEMS', payload: newArray });
        }

        dispatch({
            type: 'SET_GRID_LIST_STYLE',
            payload: updateGridTemplateStyle(
                templateRowsList,
                'gridTemplateRows',
                gridListStyle
            ),
        });
    }, [templateRows]);

    useEffect(() => {
        dispatch({
            type: 'SET_GRID_LIST_STYLE',
            payload: updateGridTemplateStyle(
                templateRowsList,
                'gridTemplateRows',
                gridListStyle
            ),
        });
    }, [templateRowsList]);

    const updateGridRowTemplate = () => {
        dispatch({
            type: 'ADD_TEMPLATE_ROWS',
            payload: templateRows + 1,
        });
        dispatch({
            type: 'SET_GRID_ROWS_ITEMS',
            payload: updateGridTemplate(templateRowsList),
        });
    };

    const deleteGridRow = (e) => {
        dispatch({
            type: 'ADD_TEMPLATE_ROWS',
            payload: templateRows - 1,
        });
        dispatch({
            type: 'SET_GRID_ROWS_ITEMS',
            payload: deleteGridTemplate(e, templateRowsList),
        });
    };

    const onRowsValueChange = (e) => {
        dispatch({
            type: 'SET_GRID_ROWS_ITEMS',
            payload: onValueChange(e, templateRowsList),
        });
    };

    const setAllRowsItems = templateRowsList.map((rowItem, index) => (
        <ListItem
            key={rowItem.id}
            id={rowItem.id}
            index={index}
            name={'Row'}
            value={rowItem.value}
            input={rowItem.input}
            options={rowItem.options}
            onValueChange={onRowsValueChange}
            deleteGridTemplate={deleteGridRow}
        />
    ));

    return (
        <section className="control-field__section gird__row-template">
            <h2 className="control-field__title">Grid Template Rows</h2>
            <p className="control-field__description">
                grid-template-rows defines how the elements will be divided into{' '}
                <strong>horizontal rows</strong> and how they will be sized in
                relation to each other.
            </p>
            <div className="controls__list__container">
                {setAllRowsItems}
                <button
                    className="action primary add-template"
                    onClick={updateGridRowTemplate}
                >
                    <span>
                        <FaPlus className="icon" /> Add another row
                    </span>
                </button>
            </div>
            <div className="control-field__current-value">
                <p className="control-field__current-value__label">
                    Current Value:
                </p>
                <code>
                    grid-template-rows: {gridListStyle.gridTemplateRows}
                </code>
            </div>
        </section>
    );
}

export default ControlRowItem;
