import React, { useState, useEffect } from "react";
import ControlsListItem from "./ControlsListItem";
import {nanoid} from "nanoid";

function App() {
    const [gridList, setGridList] = useState([]);
    const [gridItems, setGridItems] = useState(3);
    const [templateColumnsList, setTemplateColumnsList] = useState([]);
    const [templateColumns, setTemplateColumns] = useState(3);
    const [templateRows, setTemplateRows] = useState([]);
    
    useEffect(() => {
        setGridList([]);
        let count = 1;

        for (let i = 0; i < gridItems; i++) {
            const item = {
                id: count,
                number: count,
                class: "grid__item"
            }

            count++;

            setGridList(prevGridList => ([
                ...prevGridList,
                item
            ]));
        }
    }, [gridItems])

    useEffect(() => {
        setTemplateColumnsList([]);
        let count = 1;

        for (let i = 0; i < templateColumns; i++) {
            const item = {
                id: nanoid(),
                name: `Column ${count}`,
                input: {
                    id: nanoid(),
                    value: "1",
                },
                options: {
                    id: nanoid(),
                    selected: "fr",
                    option: ["fr", "px", "%", "auto"]
                }
            }

            count++;

            setTemplateColumnsList(prevColumnList => ([
                ...prevColumnList,
                item
            ]));
        }
    }, [templateColumns])

    let gridListStyle = {
        gridTemplateColumns: "1fr 1fr 1fr", 
        gridTemplateRows: "auto", 
        gap: "20px", 
        placeItems: "stretch"
    };

    const addElement = () => {
        setGridItem(gridItems + 1)
    }
    
    const removeElement = () => {
        setGridItem(gridItems - 1)
    }

    const onValueChange = (event) => {
        const parent = event.target.parentElement.id;
        const { value } = event.target
        
        const updateValue = templateColumnsList.map(columnListItem => {
            if (parent === columnListItem.id) {
                columnListItem.input.value = value;
            }
            return columnListItem;
        })

        setTemplateColumnsList(updateValue);
    }

    const setAllGridItems = gridList.map(gridItem => (
        <li 
            key={gridItem.id}
            id={gridItem.id}
            className={gridItem.class}
        >{gridItem.number}</li>
        )
    )

    const setAllColumnsItems = templateColumnsList.map(columnItem => (
        <ControlsListItem 
            key={columnItem.id}
            id={columnItem.id}
            name={columnItem.name}
            value={columnItem.value}
            input={columnItem.input}
            options={columnItem.options}
            onValueChange={onValueChange}
        />
        )
    )

    return (
        <>
            <h1>Grid Generator</h1>
            <section className="control-field__section">
                <h2 className="control-field__title">Add or Remove elements within the grid</h2>
                <div className="controls__container">
                    <button className="action add" onClick={addElement}>+</button>
                    <button className="action remove" onClick={removeElement}>-</button>
                </div>
            </section>
            <section className="control-field__section">
                <h2 className="control-field__title">Grid Template Columns</h2>
                <p className="control-field__description">grid-template-columns defines how the elements will be divided into <strong>vertical columns</strong> and how they will be sized in relation to each other.</p>
                <div className="controls__list__container">
                    {setAllColumnsItems}
                    <button className="action primary">
                        <span>+ Add another column</span>
                    </button>
                </div>
                <div className="control-field__current-value">
                    <p className="control-field__current-value__label">Current Value:</p>
                    <code>grid-template-columns: 1fr 200px 1fr</code>
                </div>
            </section>
            <section className="control-field__section">
                <h2 className="control-field__title">Grid Column Gap</h2>
                <p className="control-field__description">Defines the horizontal space <strong>between</strong> all columns.</p>
                <div className="controls__container">
                    <input placeholder="10" type="number" min="0" className="input"/>
                    <select>
                        <option val="px">px</option>
                        <option val="%">%</option>
                    </select>
                </div>
            </section>
            <section className="preview result__preview">
                <ul className="grid__list" id="grid__list" 
                    style={gridListStyle}>
                    {setAllGridItems}
                </ul>
            </section>
            <section className="result-code">
                <code className="code__lang"> 
                    display: grid;
                    grid-template-columns: 1fr 200px 1fr;
                    grid-template-rows: 2fr 100px;
                    grid-column-gap: 20px
                    grid-row-gap: 20px
                    justify-items: stretch
                    align-items: stretch
                </code>
            </section>
        </>
    );
}

export default App;