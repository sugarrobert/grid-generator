import React from 'react';
import GridResultPreview from './components/GridResultPreview';
import GridResultCode from './components/GridResultCode';
import ControlGridItem from './components/controls/ControlGridItem';
import ControlRowItem from './components/controls/ControlRowItem';
import ControlColumnItem from './components/controls/ControlColumnItem';
import ControlColumnGap from './components/controls/ControlColumnGap';
import ControlRowGap from './components/controls/ControlRowGap';
import ControlJustifyAlignment from './components/controls/ControlJustifyAlignment';
import ControlVerticallyAlignment from './components/controls/ControlVerticallyAlignment';
import { GridTemplateProvider } from './context/GridContext';

function App() {
    return (
        <>
            <header className="main-title">
                <h1 className="container">Grid Genie</h1>
            </header>
            <main className="container">
                <GridTemplateProvider>
                    <div className="control-field__container">
                        <ControlGridItem />
                        <ControlColumnItem />
                        <ControlRowItem />
                        <ControlColumnGap />
                        <ControlRowGap />
                        <ControlJustifyAlignment />
                        <ControlVerticallyAlignment />
                    </div>
                    <div className="result__preview__container">
                        <GridResultPreview />
                        <GridResultCode />
                    </div>
                </GridTemplateProvider>
            </main>
        </>
    );
}

export default App;
