import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import {
    createNewTemplateItem,
    updateGridTemplate,
    onValueChange,
    onGutterValueChange,
    updateGridTemplateStyle,
    updateGridGuttersStyle,
    onAlignmentValueChange,
    updateGridAlignment,
    deleteGridTemplate,
} from './GridActions';

const GridContext = createContext();

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
        updateGridTemplateStyle(
            templateColumnsList,
            'gridTemplateColumns',
            setGridListStyle
        );
        updateGridTemplateStyle(
            templateRowsList,
            'gridTemplateRows',
            setGridListStyle
        );
    }, [templateColumnsList, templateRowsList]);

    useEffect(() => {
        updateGridGuttersStyle(gridRowGap, 'gridRowGap', setGridListStyle);
        updateGridGuttersStyle(
            gridColumnGap,
            'gridColumnGap',
            setGridListStyle
        );
    }, [gridRowGap, gridColumnGap]);

    useEffect(() => {
        updateGridAlignment(gridJustify, 'justifyItems', setGridListStyle);
        updateGridAlignment(gridAlign, 'alignItems', setGridListStyle);
    }, [gridJustify, gridAlign]);

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

    const onColumnValueChange = (e) => {
        onValueChange(e, templateColumnsList, setTemplateColumnsList);
    };

    const onRowsValueChange = (e) => {
        onValueChange(e, templateRowsList, setTemplateRowsList);
    };

    const setNewRowGutter = (e) => {
        onGutterValueChange(e, setGridRowGap);
    };

    const setNewColumnGutter = (e) => {
        onGutterValueChange(e, setGridColumnGap);
    };

    const setNewJustifyAlignment = (e) => {
        onAlignmentValueChange(e, setGridJustify);
    };

    const setNewAlignAlignment = (e) => {
        onAlignmentValueChange(e, setGridAlign);
    };

    const updateGridColumnTemplate = () => {
        updateGridTemplate(setTemplateColumns, setTemplateColumnsList);
    };

    const updateGridRowTemplate = () => {
        updateGridTemplate(setTemplateRows, setTemplateRowsList);
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
        <GridContext.Provider
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
                onColumnValueChange,
                onRowsValueChange,
                setNewRowGutter,
                setNewColumnGutter,
                setNewJustifyAlignment,
                setNewAlignAlignment,
                updateGridColumnTemplate,
                updateGridRowTemplate,
                deleteGridColumn,
                deleteGridRow,
            }}
        >
            {children}
        </GridContext.Provider>
    );
};

export default GridContext;
