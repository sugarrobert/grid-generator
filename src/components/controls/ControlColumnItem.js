import React from 'react';
import { useContext, useEffect } from 'react';
import GridContext from '../../context/GridContext';
import ListItem from '../ListItem';
import {
    createNewTemplateItem,
    updateGridTemplate,
    deleteGridTemplate,
    onValueChange,
    updateGridTemplateStyle,
} from '../../context/GridActions';

function ControlColumnItem() {
    const { templateColumns, templateColumnsList, gridListStyle, dispatch } =
        useContext(GridContext);

    useEffect(() => {
        const newArray = [];
        if (templateColumnsList.length === 0) {
            for (let i = 0; i < templateColumns; i++) {
                const newItem = createNewTemplateItem();
                newArray.push(newItem);
            }
            dispatch({ type: 'SET_GRID_COLUMNS_ITEMS', payload: newArray });
        }

        dispatch({
            type: 'SET_GRID_LIST_STYLE',
            payload: updateGridTemplateStyle(
                templateColumnsList,
                'gridTemplateColumns',
                gridListStyle
            ),
        });
    }, [templateColumns]);

    useEffect(() => {
        dispatch({
            type: 'SET_GRID_LIST_STYLE',
            payload: updateGridTemplateStyle(
                templateColumnsList,
                'gridTemplateColumns',
                gridListStyle
            ),
        });
    }, [templateColumnsList]);

    const updateGridColumnTemplate = () => {
        dispatch({
            type: 'ADD_TEMPLATE_COLUMNS',
            payload: templateColumns + 1,
        });
        dispatch({
            type: 'SET_GRID_COLUMNS_ITEMS',
            payload: updateGridTemplate(templateColumnsList),
        });
    };

    const deleteGridColumn = (e) => {
        dispatch({
            type: 'ADD_TEMPLATE_COLUMNS',
            payload: templateColumns - 1,
        });
        dispatch({
            type: 'SET_GRID_COLUMNS_ITEMS',
            payload: deleteGridTemplate(e, templateColumnsList),
        });
    };

    const onColumnValueChange = (e) => {
        dispatch({
            type: 'SET_GRID_COLUMNS_ITEMS',
            payload: onValueChange(e, templateColumnsList),
        });
    };

    const setAllColumnsItems = templateColumnsList.map((columnItem, index) => (
        <ListItem
            key={columnItem.id}
            id={columnItem.id}
            index={index}
            name={'Column'}
            value={columnItem.value}
            input={columnItem.input}
            options={columnItem.options}
            onValueChange={onColumnValueChange}
            deleteGridTemplate={deleteGridColumn}
        />
    ));

    return (
        <section className="control-field__section">
            <h2 className="control-field__title">Grid Template Columns</h2>
            <p className="control-field__description">
                grid-template-columns defines how the elements will be divided
                into <strong>vertical columns</strong> and how they will be
                sized in relation to each other.
            </p>
            <div className="controls__list__container">
                {setAllColumnsItems}
                <button
                    className="action primary"
                    onClick={updateGridColumnTemplate}
                >
                    <span>+ Add another column</span>
                </button>
            </div>
            <div className="control-field__current-value">
                <p className="control-field__current-value__label">
                    Current Value:
                </p>
                <code>
                    grid-template-columns: {gridListStyle.gridTemplateColumns}
                </code>
            </div>
        </section>
    );
}

export default ControlColumnItem;
