import React, { useState, useEffect } from "react";
import ControlsListItem from "./ControlsListItem";
import {nanoid} from "nanoid";

function App() {
    const [gridList, setGridList] = useState([]);
    const [gridItems, setGridItems] = useState(9);
    const [templateColumnsList, setTemplateColumnsList] = useState([]);
    const [templateColumns, setTemplateColumns] = useState(3);
    const [templateRows, setTemplateRows] = useState([]);
    const [gridListStyle, setGridListStyle] = useState({
        gridTemplateColumns: "1fr 1fr 1fr", 
        gridTemplateRows: "auto", 
        gap: "20px", 
        placeItems: "stretch"
    });

    useEffect(() => {
        setGridList([]);

        for (let i = 0; i < gridItems; i++) {
            const item = {
                id: nanoid(),
                class: "grid__item"
            }

            setGridList(prevGridList => ([
                ...prevGridList,
                item
            ]));
        }
    }, [gridItems])

    useEffect(() => {    
        if (templateColumnsList.length === 0) {
            setTemplateColumnsList([]);

            for (let i = 0; i < templateColumns; i++) {
                const newItem = createNewTemplateItem(); 
    
                setTemplateColumnsList(prevColumnList => ([
                    ...prevColumnList,
                    newItem
                ]));
            }
        }
        
    }, [templateColumns])

    useEffect(() => {
        updateListStyle();
    }, [templateColumnsList])

    const createNewTemplateItem = () => {
        const id = nanoid();
    
        return {
            id: id,
            input: {
                id: nanoid(),
                dataId: id,
                value: "1",
            },
            options: {
                id: nanoid(),
                dataId: id,
                selected: "fr",
                option: ["fr", "px", "%", "auto"]
            }
        }
    }

    const addElement = () => {
        setGridItems(gridItems + 1);
    }
    
    const removeElement = () => {
        setGridItems(gridItems - 1)
    }

    const onValueChange = (event) => {
        const parent = event.target.parentElement.id;
        const elementName = event.target.nodeName;
        const { value } = event.target
        
        const updateValue = templateColumnsList.map(columnListItem => {
            if (elementName === "INPUT") {
                if (parent === columnListItem.id) {
                    columnListItem.input.value = value;
                }
            } else if (elementName === "SELECT") {
                if (parent === columnListItem.id) {
                    columnListItem.options.selected = value;
                }
            }

            return columnListItem;
        })

        setTemplateColumnsList(updateValue);
    }

    const updateListStyle = () => {
        const columnStyle = templateColumnsList.map(style => {
            const input = style.input.value;
            const option = style.options.selected;
            let newValue;

            if (option !== "auto") {
                newValue = input + option;
            } else {
                newValue = option;
            }
            
            return newValue;
        })

        const newColumnStyle = columnStyle.join(" ");

        setGridListStyle(prevStyle => ({
            ...prevStyle,
            gridTemplateColumns: newColumnStyle
        }));
    }

    const updateGridTemplate = () => {
        setTemplateColumns(templateColumns + 1);
        const newItem = createNewTemplateItem();

        setTemplateColumnsList(prevColumnList => ([
            ...prevColumnList,
            newItem
        ]));
    }
    
    const deleteGridTemplate = (e) => {
        const btnId = e.target.dataset.id;

        const newColumnList = templateColumnsList.filter(listItem => {
            setTemplateColumns(templateColumns - 1);
            return listItem.id !== btnId;
        })

        setTemplateColumnsList(newColumnList);
    }

    const setAllGridItems = gridList.map((gridItem, index) => (
        <li 
            key={gridItem.id}
            id={gridItem.id}
            className={gridItem.class}
        >{index + 1}</li>
        )
    )

    const setAllColumnsItems = templateColumnsList.map((columnItem, index) => (
        <ControlsListItem 
            key={columnItem.id}
            id={columnItem.id}
            index={index}
            value={columnItem.value}
            input={columnItem.input}
            options={columnItem.options}
            onValueChange={onValueChange}
            deleteGridTemplate={deleteGridTemplate}
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
                    <button className="action primary" onClick={updateGridTemplate}>
                        <span>+ Add another column</span>
                    </button>
                </div>
                <div className="control-field__current-value">
                    <p className="control-field__current-value__label">Current Value:</p>
                    <code>grid-template-columns: {gridListStyle.gridTemplateColumns}</code>
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