import React, { useEffect, useContext, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { db } from "../services/firebase-config";
import { ref, set, onValue, child, update, push } from "firebase/database";

import Reveal from "reveal.js";
import parse from "html-react-parser";

import { SlideContext } from "../context/SlideContext";

import "../../node_modules/reveal.js/dist/reveal.css";
import "../../node_modules/reveal.js/dist/theme/night.css";

import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

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
