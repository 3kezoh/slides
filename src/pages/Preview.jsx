import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { onValue, ref, set } from "firebase/database";
import { db } from "../services/firebase-config";

import parse from "html-react-parser";
import Reveal from "reveal.js";

import { SlideContext } from "../context/SlideContext";

import "../../node_modules/reveal.js/dist/reveal.css";
import "../../node_modules/reveal.js/dist/theme/night.css";

import { uid } from "uid";

const Preview = () => {
  const { roomId } = useParams();

  const { slideNumber, setSlideNumber, slideTotal, setSlideTotal } =
    useContext(SlideContext);

  const [slides, setSlides] = useState([]);
  const [revealInitialize, setRevealInitialize] = useState(false);

  useEffect(() => {
    if (!revealInitialize && slides.length !== 0) {
      Reveal.initialize({
        controls: false,
      });
      setRevealInitialize(true);
      updateTotalSlides();

      Reveal.on("slidechanged", ({ indexh }) => {
        setSlideNumber(indexh);
        updateTotalSlides();
      });
    }
  }, [slides, revealInitialize]);

  //Update slides array
  useEffect(() => {
    const slideRef = ref(db, `room/${roomId}/slide`);
    onValue(slideRef, (snapshot) => {
      const data = snapshot.val();
      setSlides(data);
    });
  }, []);

  const updateTotalSlides = useCallback(() => {
    if (slides.length !== 0) {
      setSlideTotal(slides.length);
    }
  }, [slides]);

  const addPage = useCallback(() => {
    const uuid = uid();
    set(ref(db, `room/${roomId}/slide/${slideTotal}`), {
      htmlCode: "",
      uuid: uuid,
    });
    setSlideTotal(slideTotal + 1);
    Reveal.destroy();
    setRevealInitialize(false);
  }, [slideTotal, slides]);

  const deletePage = useCallback(() => {
    set(ref(db, `room/${roomId}/slide/${slideTotal - 1}`), null);
    setSlideTotal(slideTotal - 1);
    Reveal.destroy();
    setRevealInitialize(false);
  }, [slideNumber, slideTotal]);

  return (
    <>
      <div className="reveal" style={{ width: "100vw", height: "100vh" }}>
        <div className="slides">
          {slides.length !== 0 &&
            slides.map((slide, index) => (
              <section key={index}>{parse(slide.htmlCode)}</section>
            ))}
        </div>
      </div>
    </>
  );
};

export default Preview;
