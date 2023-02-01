import React from 'react';
import { createContext, useReducer } from 'react';
import gridReducer from './GridReducer';
import { nanoid } from 'nanoid';

const GridContext = createContext();

export const GridTemplateProvider = ({ children }) => {
    const initialState = {
        gridItems: 9,
        gridList: [],
        templateColumns: 3,
        templateColumnsList: [],
        templateRows: 3,
        templateRowsList: [],
        gridRowGap: {
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
        },
        gridColumnGap: {
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
        },
        gridJustify: {
            id: nanoid(),
            options: {
                id: nanoid(),
                selected: 'stretch',
                option: ['stretch', 'center', 'start', 'end'],
            },
        },
        gridAlign: {
            id: nanoid(),
            options: {
                id: nanoid(),
                selected: 'stretch',
                option: ['stretch', 'center', 'start', 'end'],
            },
        },
        gridListStyle: {
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gridColumnGap: '20px',
            gridRowGap: '20px',
            justifyItems: 'stretch',
            alignItems: 'center',
        },
    };

    const [state, dispatch] = useReducer(gridReducer, initialState);

    return (
        <GridContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </GridContext.Provider>
    );
};

export default GridContext;
