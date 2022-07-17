import React, { useCallback, useContext } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import { EditorContext } from "../context/EditorContext";

import DOMPurify from 'dompurify';

const Editor = () => {

    const { setHtmlCode } = useContext(EditorContext);

    const onChange = useCallback(dirtyHtml => {
        const cleanHtml = DOMPurify.sanitize(dirtyHtml);
        setHtmlCode(cleanHtml);
    }, []);

    return (
        <AceEditor
            mode="html"
            theme="tomorrow_night"
            onChange={onChange}
            name="editor"
            fontSize={14}
            height="200px"
            width="100%"
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
            }}
        />
    );
}

export default Editor;