const gridReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GRID_LIST':
            return {
                ...state,
                gridList: action.payload,
            };
        case 'SET_GRID_ITEMS':
            return {
                ...state,
                gridItems: action.payload,
            };
        case 'ADD_TEMPLATE_COLUMNS':
            return {
                ...state,
                templateColumns: action.payload,
            };
        case 'ADD_TEMPLATE_ROWS':
            return {
                ...state,
                templateRows: action.payload,
            };
        case 'SET_GRID_COLUMNS_ITEMS':
            return {
                ...state,
                templateColumnsList: action.payload,
            };
        case 'SET_GRID_ROWS_ITEMS':
            return {
                ...state,
                templateRowsList: action.payload,
            };
        case 'SET_GRID_COLUMN_GAP':
            return {
                ...state,
                gridColumnGap: action.payload,
            };
        case 'SET_GRID_ROW_GAP':
            return {
                ...state,
                gridRowGap: action.payload,
            };
        case 'SET_GRID_JUSTIFY_ALIGNMENT':
            return {
                ...state,
                gridJustify: action.payload,
            };
        case 'SET_GRID_VERTICALLY_ALIGNMENT':
            return {
                ...state,
                gridAlign: action.payload,
            };
        case 'SET_GRID_LIST_STYLE':
            return {
                ...state,
                gridListStyle: action.payload,
            };
        default:
            return state;
    }
};

export default gridReducer;
