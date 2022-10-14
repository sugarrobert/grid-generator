import React, { useState } from "react";

function App() {
    const [isActive, setIsActive] = useState(false);

    const toggleBackground = () => {
        setIsActive(current => !current);
    }

    return (
        <div>
            <h1>Hello!!</h1>
            <button onClick={toggleBackground}
                style={{
                    backgroundColor: isActive ? 'salmon' : '',
                    color: isActive ? 'white' : '',
                }}
            >Click me</button>
        </div>
    );
}

export default App;