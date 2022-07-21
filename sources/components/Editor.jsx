import React, { useCallback, useContext, useEffect } from "react";
import { EditorContext } from "../context/EditorContext";
import { db } from "../services/firebase-config";
import { ref, set, onValue } from "firebase/database";
import { uid } from "uid";
import { UserContext } from "../context/UserContext";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";

import DOMPurify from "dompurify";

const Editor = () => {
  const { htmlCode, setHtmlCode } = useContext(EditorContext);
  const { currentUser } = useContext(UserContext);

  //Write clean html in context
  const onChange = useCallback(dirtyHtml => {
    const cleanHtml = DOMPurify.sanitize(dirtyHtml);
    setHtmlCode(cleanHtml);
  }, []);

  //Saves html code to firebase
  useEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        const uuid = uid();
        set(ref(db, `slide/${currentUser.uid}`), {
          htmlCode: htmlCode,
          userId: currentUser.uid,
          uuid: uuid,
        });
        console.log("saved");
      }, 3000);
      return () => clearTimeout(timeout);
    }),
    [htmlCode, currentUser.uid]
  );

  //Updates html code based on database changes
  useEffect(() => {
    const slideRef = ref(db, `slide/${currentUser.uid}`);
    onValue(slideRef, snapshot => {
      const data = snapshot.val();
      setHtmlCode(data.htmlCode);
    });
  }, [currentUser.uid]);

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
};

export default Editor;
