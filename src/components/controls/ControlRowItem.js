import React from 'react';
import { useContext } from 'react';
import GridTemplateContext from '../../context/GridTemplateContext';
import ListItem from '../ListItem';

function ControlRowItem() {
    const {
        templateRowsList,
        updateGridRowTemplate,
        gridListStyle,
        onRowsValueChange,
        deleteGridRow,
    } = useContext(GridTemplateContext);

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
        <section className="control-field__section">
            <h2 className="control-field__title">Grid Template Rows</h2>
            <p className="control-field__description">
                grid-template-rows defines how the elements will be divided into{' '}
                <strong>horizontal rows</strong> and how they will be sized in
                relation to each other.
            </p>
            <div className="controls__list__container">
                {setAllRowsItems}
                <button
                    className="action primary"
                    onClick={updateGridRowTemplate}
                >
                    <span>+ Add another row</span>
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
