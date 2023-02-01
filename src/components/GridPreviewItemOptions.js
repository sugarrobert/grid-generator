import React from 'react';
import { useContext, useEffect, useRef } from 'react';
import GridContext from '../context/GridContext';

function GridPreviewItemOptions(props) {
    const { gridList, dispatch } = useContext(GridContext);
    const ref = useRef(null);
    const { columnStart, rowStart, onClickOutside } = props;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    const onItemValueChange = (e) => {
        const { id, value } = e.target;
        const rowSpan = e.target.classList.contains('row__value');
        const columnSpan = e.target.classList.contains('column__value');

        const updateValue = gridList.map((item) => {
            if (columnSpan) {
                if (id === item.columnStart.id) {
                    item.columnStart.value = value;
                }
            } else if (rowSpan) {
                if (id === item.rowStart.id) {
                    item.rowStart.value = value;
                }
            }

            return item;
        });

        dispatch({ type: 'SET_GRID_LIST', payload: updateValue });
    };

    if (!props.show) return null;

    return (
        <div ref={ref} className="item-stretch__options">
            <div className="grid-item__span__input--container">
                <label
                    htmlFor={columnStart.id}
                    className="grid-item__span__label"
                >
                    {`Grid column span`}
                </label>
                <input
                    id={columnStart.id}
                    placeholder="1"
                    type="number"
                    min="1"
                    value={columnStart.value}
                    aria-label={`Grid Template ${props.name} amount`}
                    className="input column__value"
                    onChange={onItemValueChange}
                />
            </div>
            <div className="grid-item__span__input--container">
                <label htmlFor={rowStart.id} className="grid-item__span__label">
                    {`Grid row span`}
                </label>
                <input
                    id={rowStart.id}
                    placeholder="1"
                    type="number"
                    min="1"
                    value={rowStart.value}
                    aria-label={`Grid Template ${props.name} amount`}
                    className="input row__value"
                    onChange={onItemValueChange}
                />
            </div>
        </div>
    );
}

export default GridPreviewItemOptions;
