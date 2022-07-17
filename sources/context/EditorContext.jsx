import React, { createContext, useState } from "react";

export const EditorContext = createContext();

const EditorContextProvider = props => {

    const [htmlCode, setHtmlCode] = useState("");

    return (
        <EditorContext.Provider value={{ htmlCode, setHtmlCode }}>
            {props.children}
        </EditorContext.Provider>
    );
}

export default EditorContextProvider;