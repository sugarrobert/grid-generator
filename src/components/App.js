import React, { useState, useEffect } from "react";
import ControlsListItem from "./ControlsListItem";
import ControlsGridGutters from "./ControlsGridGutters";
import ControlsGridAlignment from "./ControlsGridAlignment";
import GridItem from "./GridItem";
import {nanoid} from "nanoid";

function App() {
    const [gridItems, setGridItems] = useState(9);
    const [gridList, setGridList] = useState([]);
    const [templateColumns, setTemplateColumns] = useState(3);
    const [templateColumnsList, setTemplateColumnsList] = useState([]);
    const [templateRows, setTemplateRows] = useState(2);
    const [templateRowsList, setTemplateRowsList] = useState([]);
    const [gridRowGap, setGridRowGap] = useState({
        id: nanoid(),
        input: {
            id: nanoid(),
            value: "20",
        },
        options: {
            id: nanoid(),
            selected: "px",
            option: ["px", "%"]
        }
    });
    const [gridColumnGap, setGridColumnGap] = useState({
        id: nanoid(),
        input: {
            id: nanoid(),
            value: "20",
        },
        options: {
            id: nanoid(),
            selected: "px",
            option: ["px", "%"]
        }
    });
    const [gridJustify, setGridJustify] = useState({
        id: nanoid(),
        options: {
            id: nanoid(),
            selected: "stretch",
            option: ["stretch", "center", "start", "end"]
        }
    });
    const [gridAlign, setGridAlign] = useState({
        id: nanoid(),
        options: {
            id: nanoid(),
            selected: "stretch",
            option: ["stretch", "center", "start", "end"]
        }
    });
    const [gridListStyle, setGridListStyle] = useState({
        gridTemplateColumns: "1fr 1fr 1fr", 
        gridTemplateRows: "1fr 1fr", 
        gridColumnGap: "20px",
        gridRowGap: "20px",
        justifyItems: "stretch",
        alignItems: "center"
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
        updateGridTemplateStyle(templateColumnsList, "gridTemplateColumns");
        updateGridTemplateStyle(templateRowsList, "gridTemplateRows");
    }, [templateColumnsList, templateRowsList])

    useEffect(() => {
        updateGridGuttersStyle(gridRowGap, "gridRowGap");
        updateGridGuttersStyle(gridColumnGap, "gridColumnGap");
    }, [gridRowGap, gridColumnGap])
    
    useEffect(() => {
        updateGridAlignment(gridJustify, "justifyItems");
        updateGridAlignment(gridAlign, "alignItems");
    }, [gridJustify, gridAlign])

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
        setGridItems(currentItems => {
            return currentItems + 1;
        });
    }
    
    const removeElement = () => {
        setGridItems(currentItems => {
            return currentItems - 1;
        });
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

    const onGutterValueChange = (e, gridGutter, setGridGutter) => {
        const elementName = e.target.nodeName;
        const { value } = e.target;
        
        if (elementName === "INPUT") {
            setGridGutter(prevGutter => {
                const newInput = {...prevGutter};
                newInput.input.value = value;
                return newInput;
            });
        } else if (elementName === "SELECT") {
            setGridGutter(prevGutter => {
                const newSelected = {...prevGutter};
                newSelected.options.selected = value;
                return newSelected;
            });
        }
    }

    const updateGridTemplateStyle = (templateList, updateStyle) => {
        const templateStyle = templateList.map(style => {
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

        const newStyle = templateStyle.join(" ");

        setGridListStyle(prevStyle => ({
            ...prevStyle,
            [updateStyle]: newStyle
        }));
    }

    const updateGridGuttersStyle = (templateGutter, updateStyle) => {
        const input = templateGutter.input.value;
        const option = templateGutter.options.selected;
        const newValue = input + option;

        setGridListStyle(prevGutter => {
            const newGutter = {...prevGutter};
            newGutter[updateStyle] = newValue;
            return newGutter;
        });
    }

    const setNewRowGutter = (e) => {
        onGutterValueChange(e, gridRowGap, setGridRowGap);
    }
    
    const setNewColumnGutter = (e) => {
        onGutterValueChange(e, gridColumnGap, setGridColumnGap);
    }

    const onAlignmentValueChange = (e, gridAlignment, setGridAlignment) => {
        const { value } = e.target;
        
        setGridAlignment(prevAlignment => {
            const newSelected = {...prevAlignment};
            newSelected.options.selected = value;
            return newSelected;
        });
    }

    const updateGridAlignment = (templateAlignment, updateStyle) => {
        const option = templateAlignment.options.selected;

        setGridListStyle(prevAlignment => {
            const newAlignment = {...prevAlignment};
            newAlignment[updateStyle] = option;
            return newAlignment;
        });
    }

    const setNewJustifyAlignment = (e) => {
        onAlignmentValueChange(e, gridJustify, setGridJustify);
    }

    const setNewAlignAlignment = (e) => {
        onAlignmentValueChange(e, gridAlign, setGridAlign);
    }

    const updateGridTemplate = (setTemplateNum, setTemplateList) => {
        setTemplateNum(currentTemplateNum => {
            return currentTemplateNum + 1
        });
        
        const newItem = createNewTemplateItem();

        setTemplateList(prevList => ([
            ...prevList,
            newItem
        ]));
    }
    
    const updateGridColumnTemplate = () => {
        updateGridTemplate(setTemplateColumns, setTemplateColumnsList);
    }
    
    const updateGridRowTemplate = () => {
        updateGridTemplate(setTemplateRows, setTemplateRowsList);
    }
    
    const deleteGridTemplate = (e, setTemplateNum, templateList, setTemplateList) => {
        const btnId = e.target.dataset.id;

        setTemplateNum(currentTemplateNum => {
            return currentTemplateNum - 1
        });

        const newColumnList = templateList.filter(listItem => {
            return listItem.id !== btnId;
        })

        setTemplateList(newColumnList);
    }

    const deleteGridColumn = (e) => {
        deleteGridTemplate(e, setTemplateColumns, templateColumnsList, setTemplateColumnsList)
    }
    
    const deleteGridRow = (e) => {
        deleteGridTemplate(e, setTemplateRows, templateRowsList, setTemplateRowsList)
    }

    const setAllGridItems = gridList.map((gridItem, index) => (
        <GridItem
            key={gridItem.id}
            id={gridItem.id}
            index={index}
            class={gridItem.class}
        />
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
            <header>
                <h1>Grid Generator</h1>
            </header>
            <main>
                <div className="control-field__container">
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
                        <p className="control-field__description">grid-template-rows defines how the elements will be divided into <strong>horizontal rows</strong> and how they will be sized in relation to each other.</p>
                        <div className="controls__list__container">
                            {setAllRowsItems}
                            <button className="action primary" onClick={updateGridRowTemplate}>
                                <span>+ Add another row</span>
                            </button>
                        </div>
                        <div className="control-field__current-value">
                            <p className="control-field__current-value__label">Current Value:</p>
                            <code>grid-template-rows: {gridListStyle.gridTemplateRows}</code>
                        </div>
                    </section>
                    <section className="control-field__section">
                        <h2 className="control-field__title">Grid Row Gap</h2>
                        <p className="control-field__description">Defines the horizontal space <strong>between</strong> all rows.</p>
                        <div className="controls__container">
                        <ControlsGridGutters 
                            key={gridRowGap.id}
                            id={gridRowGap.id}
                            value={gridRowGap.value}
                            input={gridRowGap.input}
                            options={gridRowGap.options}
                            onValueChange={setNewRowGutter}
                        />
                        </div>
                    </section>
                    <section className="control-field__section">
                        <h2 className="control-field__title">Grid Column Gap</h2>
                        <p className="control-field__description">Defines the horizontal space <strong>between</strong> all columns.</p>
                        <div className="controls__container">
                        <ControlsGridGutters 
                            key={gridColumnGap.id}
                            id={gridColumnGap.id}
                            value={gridColumnGap.value}
                            input={gridColumnGap.input}
                            options={gridColumnGap.options}
                            onValueChange={setNewColumnGutter}
                        />
                        </div>
                    </section>
                    <section className="control-field__section">
                        <h2 className="control-field__title">Justify Items</h2>
                        <p className="control-field__description">Defines how the items will be aligned <strong>horizontally</strong> in each column.</p>
                        <div className="controls__container">
                        <ControlsGridAlignment 
                            key={gridJustify.id}
                            id={gridJustify.id}
                            options={gridJustify.options}
                            onValueChange={setNewJustifyAlignment}
                        />
                        </div>
                    </section>
                    <section className="control-field__section">
                        <h2 className="control-field__title">Align Items</h2>
                        <p className="control-field__description">Defines how the items will be aligned <strong>vertically</strong> in each column.</p>
                        <div className="controls__container">
                        <ControlsGridAlignment 
                            key={gridAlign.id}
                            id={gridAlign.id}
                            options={gridAlign.options}
                            onValueChange={setNewAlignAlignment}
                        />
                        </div>
                    </section>
                </div>
                <div className="result__preview__container">
                    <section className="preview result__preview">
                        <ul className="grid__list" id="grid__list" 
                            style={gridListStyle}>
                            {setAllGridItems}
                        </ul>
                    </section>
                    <section className="result-code">
                        <code className="code__lang"> 
                            display: grid;
                            grid-template-columns: 1fr 200px 1fr;<br/>
                            grid-template-rows: 2fr 100px;<br/>
                            grid-column-gap: 20px;<br/>
                            grid-row-gap: 20px;<br/>
                            justify-items: stretch;<br/>
                            align-items: stretch;
                        </code>
                    </section>
                </div>
            </main>
        </>
    );
}

export default App;