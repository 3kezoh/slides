import React, { useCallback, useContext, useEffect, useState } from "react";
import { SlideContext } from "../context/SlideContext";
import { db } from "../services/firebase-config";
import { ref, set, onValue, child, update, push } from "firebase/database";
import { uid } from "uid";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

import { Editor as TinyMce } from '@tinymce/tinymce-react';

import DOMPurify from "dompurify";

import "../../styles/editor.css";

const Editor = () => {
  const [ editorContent, setEditorContent ] = useState('');
  const [ loadHtml, setLoadHtml ] = useState('');

  //Get room id
  const { roomId } = useParams();

  const { slideNumber, setSlideNumber, slideTotal, setSlideTotal } = useContext(SlideContext);
  const { currentUser } = useContext(UserContext);

  //Write clean html in firebase
  const onChange = useCallback((htmlCode) => {
    const decodedHtml = decodeEntity(htmlCode)
    const cleanHtml = DOMPurify.sanitize(decodedHtml, { USE_PROFILES: { html: true } });
    setEditorContent(cleanHtml);
  }, []);

  const decodeEntity = (inputStr) => {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
  }

  //Saves html code to firebase
  useEffect(
    useCallback(() => {
      if (editorContent !== '') {
        const uuid = uid();
        set(ref(db, `room/${roomId}/slide/${slideNumber}`), {
          htmlCode: editorContent,
          uuid: uuid,
        });
      }
    }),
    [editorContent, currentUser.uid]
  );

  //Updates html code based on database changes
  useEffect(() => {
    const slideRef = ref(db, `room/${roomId}/slide/${slideNumber}`);
    onValue(slideRef, (snapshot) => {
      const data = snapshot.val();
      setEditorContent(data.htmlCode);
      if(!loadHtml) {
        setLoadHtml(data.htmlCode);
      }
    });
  }, [currentUser.uid, slideNumber]);

  return (
    <>
      <TinyMce
        apiKey='cocekja1lio6dclbpa4my05qxoqtznk6rvqk5h4ep119pb5z'
        value={editorContent}
        onEditorChange={onChange}
        init={{
          forced_root_block: false,
          menubar: false,
          skin: "oxide-dark",
          content_css: "dark",
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          statusbar : false,
        }}
      />
    </>
  );
};

export default Editor;
