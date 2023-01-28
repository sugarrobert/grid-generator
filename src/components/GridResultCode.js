import React from 'react';
import { useContext } from 'react';
import GridContext from '../context/GridContext';

function GridResultCode() {
    const { gridListStyle, gridList } = useContext(GridContext);

    const copyCode = async () => {
        const text = document.querySelector('.code__lang').innerHTML;

        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const createNewItemStyle = (itemClass, columnVal, rowVal) => {
        return `
    .${itemClass} {
        ${columnVal > 1 ? `grid-column-start: span ${columnVal};` : ''}
        ${rowVal > 1 ? `grid-row-start: span ${rowVal};` : ''}
    }
    `;
    };

    const setItemsStyle = gridList.map((item) => {
        const itemClass = item.id;
        const columnSpan = item.columnStart.value;
        const rowSpan = item.rowStart.value;

        if (columnSpan > 1 || rowSpan > 1) {
            return createNewItemStyle(itemClass, columnSpan, rowSpan);
        }
    });

    const gridCode = `
    .container {
        display: grid;
        grid-template-columns: ${gridListStyle.gridTemplateColumns};
        grid-template-rows: ${gridListStyle.gridTemplateRows};
        grid-column-gap: ${gridListStyle.gridColumnGap};
        grid-row-gap: ${gridListStyle.gridRowGap};
        justify-items: ${gridListStyle.justifyItems};
        align-items: ${gridListStyle.alignItems};
    }
    `;

    return (
        <section className="result-code">
            <pre>
                <code className="code__lang">
                    {gridCode}
                    {setItemsStyle}
                </code>
            </pre>
            <button className="action copy-code" onClick={copyCode}>
                Copy Code
            </button>
        </section>
    );
}

export default GridResultCode;
