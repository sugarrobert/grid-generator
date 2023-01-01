import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const GridTemplateContext = createContext();

export const GridTemplateProvider = ({ children }) => {
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
            value: '20',
        },
        options: {
            id: nanoid(),
            selected: 'px',
            option: ['px', '%'],
        },
    });
    const [gridColumnGap, setGridColumnGap] = useState({
        id: nanoid(),
        input: {
            id: nanoid(),
            value: '20',
        },
        options: {
            id: nanoid(),
            selected: 'px',
            option: ['px', '%'],
        },
    });
    const [gridJustify, setGridJustify] = useState({
        id: nanoid(),
        options: {
            id: nanoid(),
            selected: 'stretch',
            option: ['stretch', 'center', 'start', 'end'],
        },
    });
    const [gridAlign, setGridAlign] = useState({
        id: nanoid(),
        options: {
            id: nanoid(),
            selected: 'stretch',
            option: ['stretch', 'center', 'start', 'end'],
        },
    });
    const [gridListStyle, setGridListStyle] = useState({
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gridColumnGap: '20px',
        gridRowGap: '20px',
        justifyItems: 'stretch',
        alignItems: 'center',
    });

    useEffect(() => {
        setGridList([]);

        for (let i = 0; i < gridItems; i++) {
            const item = {
                id: nanoid(),
                class: 'grid__item',
            };

            setGridList((prevGridList) => [...prevGridList, item]);
        }
    }, [gridItems]);

    useEffect(() => {
        if (templateColumnsList.length === 0) {
            setTemplateColumnsList([]);

            for (let i = 0; i < templateColumns; i++) {
                const newItem = createNewTemplateItem();

                setTemplateColumnsList((prevColumnList) => [
                    ...prevColumnList,
                    newItem,
                ]);
            }
        }

        if (templateRowsList.length === 0) {
            setTemplateRowsList([]);

            for (let i = 0; i < templateRows; i++) {
                const newItem = createNewTemplateItem();

                setTemplateRowsList((prevRowList) => [...prevRowList, newItem]);
            }
        }
    }, [templateColumns, templateRows]);

    useEffect(() => {
        updateGridTemplateStyle(templateColumnsList, 'gridTemplateColumns');
        updateGridTemplateStyle(templateRowsList, 'gridTemplateRows');
    }, [templateColumnsList, templateRowsList]);

    useEffect(() => {
        updateGridGuttersStyle(gridRowGap, 'gridRowGap');
        updateGridGuttersStyle(gridColumnGap, 'gridColumnGap');
    }, [gridRowGap, gridColumnGap]);

    useEffect(() => {
        updateGridAlignment(gridJustify, 'justifyItems');
        updateGridAlignment(gridAlign, 'alignItems');
    }, [gridJustify, gridAlign]);

    const createNewTemplateItem = () => {
        const id = nanoid();

        return {
            id: id,
            input: {
                id: nanoid(),
                dataId: id,
                value: '1',
            },
            options: {
                id: nanoid(),
                dataId: id,
                selected: 'fr',
                option: ['fr', 'px', '%', 'auto'],
            },
        };
    };

    const addElement = () => {
        setGridItems((currentItems) => {
            return currentItems + 1;
        });
    };

    const removeElement = () => {
        setGridItems((currentItems) => {
            return currentItems - 1;
        });
    };

    const onValueChange = (e, templateList, setTemplateList) => {
        const parent = e.target.parentElement.id;
        const elementName = e.target.nodeName;
        const { value } = e.target;

        const updateValue = templateList.map((listItem) => {
            if (elementName === 'INPUT') {
                if (parent === listItem.id) {
                    listItem.input.value = value;
                }
            } else if (elementName === 'SELECT') {
                if (parent === listItem.id) {
                    listItem.options.selected = value;
                }
            }

            return listItem;
        });

        setTemplateList(updateValue);
    };

    const onColumnValueChange = (e) => {
        onValueChange(e, templateColumnsList, setTemplateColumnsList);
    };

    const onRowsValueChange = (e) => {
        onValueChange(e, templateRowsList, setTemplateRowsList);
    };

    const onGutterValueChange = (e, gridGutter, setGridGutter) => {
        const elementName = e.target.nodeName;
        const { value } = e.target;

        if (elementName === 'INPUT') {
            setGridGutter((prevGutter) => {
                const newInput = { ...prevGutter };
                newInput.input.value = value;
                return newInput;
            });
        } else if (elementName === 'SELECT') {
            setGridGutter((prevGutter) => {
                const newSelected = { ...prevGutter };
                newSelected.options.selected = value;
                return newSelected;
            });
        }
    };

    const updateGridTemplateStyle = (templateList, updateStyle) => {
        const templateStyle = templateList.map((style) => {
            const input = style.input.value;
            const option = style.options.selected;
            let newValue;

            if (option !== 'auto') {
                newValue = input + option;
            } else {
                newValue = option;
            }

            return newValue;
        });

        const newStyle = templateStyle.join(' ');

        setGridListStyle((prevStyle) => ({
            ...prevStyle,
            [updateStyle]: newStyle,
        }));
    };

    const updateGridGuttersStyle = (templateGutter, updateStyle) => {
        const input = templateGutter.input.value;
        const option = templateGutter.options.selected;
        const newValue = input + option;

        setGridListStyle((prevGutter) => {
            const newGutter = { ...prevGutter };
            newGutter[updateStyle] = newValue;
            return newGutter;
        });
    };

    const setNewRowGutter = (e) => {
        onGutterValueChange(e, gridRowGap, setGridRowGap);
    };

    const setNewColumnGutter = (e) => {
        onGutterValueChange(e, gridColumnGap, setGridColumnGap);
    };

    const onAlignmentValueChange = (e, gridAlignment, setGridAlignment) => {
        const { value } = e.target;

        setGridAlignment((prevAlignment) => {
            const newSelected = { ...prevAlignment };
            newSelected.options.selected = value;
            return newSelected;
        });
    };

    const updateGridAlignment = (templateAlignment, updateStyle) => {
        const option = templateAlignment.options.selected;

        setGridListStyle((prevAlignment) => {
            const newAlignment = { ...prevAlignment };
            newAlignment[updateStyle] = option;
            return newAlignment;
        });
    };

    const setNewJustifyAlignment = (e) => {
        onAlignmentValueChange(e, gridJustify, setGridJustify);
    };

    const setNewAlignAlignment = (e) => {
        onAlignmentValueChange(e, gridAlign, setGridAlign);
    };

    const updateGridTemplate = (setTemplateNum, setTemplateList) => {
        setTemplateNum((currentTemplateNum) => {
            return currentTemplateNum + 1;
        });

        const newItem = createNewTemplateItem();

        setTemplateList((prevList) => [...prevList, newItem]);
    };

    const updateGridColumnTemplate = () => {
        updateGridTemplate(setTemplateColumns, setTemplateColumnsList);
    };

    const updateGridRowTemplate = () => {
        updateGridTemplate(setTemplateRows, setTemplateRowsList);
    };

    const deleteGridTemplate = (
        e,
        setTemplateNum,
        templateList,
        setTemplateList
    ) => {
        const btnId = e.target.dataset.id;

        setTemplateNum((currentTemplateNum) => {
            return currentTemplateNum - 1;
        });

        const newColumnList = templateList.filter((listItem) => {
            return listItem.id !== btnId;
        });

        setTemplateList(newColumnList);
    };

    const deleteGridColumn = (e) => {
        deleteGridTemplate(
            e,
            setTemplateColumns,
            templateColumnsList,
            setTemplateColumnsList
        );
    };

    const deleteGridRow = (e) => {
        deleteGridTemplate(
            e,
            setTemplateRows,
            templateRowsList,
            setTemplateRowsList
        );
    };

    return (
        <GridTemplateContext.Provider
            value={{
                gridItems,
                gridList,
                templateColumns,
                templateColumnsList,
                templateRows,
                templateRowsList,
                gridRowGap,
                gridColumnGap,
                gridJustify,
                gridAlign,
                gridListStyle,
                addElement,
                removeElement,
                onValueChange,
                onColumnValueChange,
                onRowsValueChange,
                onGutterValueChange,
                updateGridTemplateStyle,
                updateGridGuttersStyle,
                setNewRowGutter,
                setNewColumnGutter,
                onAlignmentValueChange,
                updateGridAlignment,
                setNewJustifyAlignment,
                setNewAlignAlignment,
                updateGridTemplate,
                updateGridColumnTemplate,
                updateGridRowTemplate,
                deleteGridTemplate,
                deleteGridColumn,
                deleteGridRow,
            }}
        >
            {children}
        </GridTemplateContext.Provider>
    );
};

export default GridTemplateContext;
