import React from 'react';
import { useContext } from 'react';
import GridContext from '../context/GridContext';

function GridResultCode() {
    const { gridListStyle } = useContext(GridContext);

    const copyCode = async () => {
        const text = document.querySelector('.code__lang').innerHTML;

        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const code = `
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
                <code className="code__lang">{code}</code>
            </pre>
            <button className="action copy-code" onClick={copyCode}>
                Copy Code
            </button>
        </section>
    );
}

export default GridResultCode;
