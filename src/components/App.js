import React, { useState, useEffect } from "react";
import ControlsListItem from "./ControlsListItem";
import {nanoid} from "nanoid";

function App() {
    const [gridList, setGridList] = useState([]);
    const [gridItems, setGridItems] = useState(9);
    const [templateColumns, setTemplateColumns] = useState(3);
    const [templateColumnsList, setTemplateColumnsList] = useState([]);
    const [templateRows, setTemplateRows] = useState(2);
    const [templateRowsList, setTemplateRowsList] = useState([]);
    const [gridListStyle, setGridListStyle] = useState({
        gridTemplateColumns: "1fr 1fr 1fr", 
        gridTemplateRows: "1fr 1fr", 
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

        if (templateRowsList.length === 0) {
            setTemplateRowsList([]);

            for (let i = 0; i < templateRows; i++) {
                const newItem = createNewTemplateItem(); 
    
                setTemplateRowsList(prevRowList => ([
                    ...prevRowList,
                    newItem
                ]));
            }
        }
        
    }, [templateColumns, templateRows])

    useEffect(() => {
        updateListStyle(templateColumnsList, "gridTemplateColumns");
        updateListStyle(templateRowsList, "gridTemplateRows");
    }, [templateColumnsList, templateRowsList])

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

    const onValueChange = (e, templateList, setTemplateList) => {
        const parent = e.target.parentElement.id;
        const elementName = e.target.nodeName;
        const { value } = e.target
        
        const updateValue = templateList.map(listItem => {
            if (elementName === "INPUT") {
                if (parent === listItem.id) {
                    listItem.input.value = value;
                }
            } else if (elementName === "SELECT") {
                if (parent === listItem.id) {
                    listItem.options.selected = value;
                }
            }

            return listItem;
        })

        setTemplateList(updateValue);
    }

    const onColumnValueChange = (e) => {
        onValueChange(e, templateColumnsList, setTemplateColumnsList)
    }
    
    const onRowsValueChange = (e) => {
        onValueChange(e, templateRowsList, setTemplateRowsList)
    }

    const updateListStyle = (templateList, updateStyle) => {
        const columnStyle = templateList.map(style => {
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

        const newStyle = columnStyle.join(" ");

        setGridListStyle(prevStyle => ({
            ...prevStyle,
            [updateStyle]: newStyle
        }));
    }

    const updateGridTemplate = (templateNum, setTemplateNum, setTemplateList) => {
        setTemplateNum(templateNum + 1);
        const newItem = createNewTemplateItem();

        setTemplateList(prevList => ([
            ...prevList,
            newItem
        ]));
    }
    
    const updateGridColumnTemplate = () => {
        updateGridTemplate(templateColumns, setTemplateColumns, setTemplateColumnsList);
    }
    
    const updateGridRowTemplate = () => {
        updateGridTemplate(templateRows, setTemplateRows, setTemplateRowsList);
    }
    
    const deleteGridTemplate = (e, templateNum, setTemplateNum, templateList, setTemplateList) => {
        const btnId = e.target.dataset.id;

        const newColumnList = templateList.filter(listItem => {
            setTemplateNum(templateNum - 1);
            return listItem.id !== btnId;
        })

        setTemplateList(newColumnList);
    }

    const deleteGridColumn = (e) => {
        deleteGridTemplate(e, templateColumns, setTemplateColumns, templateColumnsList, setTemplateColumnsList)
    }
    
    const deleteGridRow = (e) => {
        deleteGridTemplate(e, templateRows, setTemplateRows, templateRowsList, setTemplateRowsList)
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
            name={"Column"}
            value={columnItem.value}
            input={columnItem.input}
            options={columnItem.options}
            onValueChange={onColumnValueChange}
            deleteGridTemplate={deleteGridColumn}
        />
        )
    )

    const setAllRowsItems = templateRowsList.map((rowItem, index) => (
        <ControlsListItem 
            key={rowItem.id}
            id={rowItem.id}
            index={index}
            name={"Row"}
            value={rowItem.value}
            input={rowItem.input}
            options={rowItem.options}
            onValueChange={onRowsValueChange}
            deleteGridTemplate={deleteGridRow}
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
                    <button className="action primary" onClick={updateGridColumnTemplate}>
                        <span>+ Add another column</span>
                    </button>
                </div>
                <div className="control-field__current-value">
                    <p className="control-field__current-value__label">Current Value:</p>
                    <code>grid-template-columns: {gridListStyle.gridTemplateColumns}</code>
                </div>
            </section>
            <section className="control-field__section">
                <h2 className="control-field__title">Grid Template Rows</h2>
                <p className="control-field__description">grid-template-columns defines how the elements will be divided into <strong>vertical columns</strong> and how they will be sized in relation to each other.</p>
                <div className="controls__list__container">
                    {setAllRowsItems}
                    <button className="action primary" onClick={updateGridRowTemplate}>
                        <span>+ Add another row</span>
                    </button>
                </div>
                <div className="control-field__current-value">
                    <p className="control-field__current-value__label">Current Value:</p>
                    <code>grid-template-columns: {gridListStyle.gridTemplateRows}</code>
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