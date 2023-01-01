import React from 'react';
import { useContext } from 'react';
import GridTemplateContext from '../../context/GridTemplateContext';
import ListItem from '../ListItem';

function ControlRowItem() {
    const {
        templateColumnsList,
        updateGridColumnTemplate,
        gridListStyle,
        onColumnValueChange,
        deleteGridColumn,
    } = useContext(GridTemplateContext);

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

export default ControlRowItem;
