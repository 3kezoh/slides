import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onValue, ref, set } from "firebase/database";
import { db } from "../services/firebase-config";
import parse from "html-react-parser";
import Reveal from "reveal.js";
import { SlideContext } from "../context/SlideContext";
import "../../node_modules/reveal.js/dist/reveal.css";
import "../../node_modules/reveal.js/dist/theme/night.css";
import "../styles/slides.css";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { uid } from "uid";

function Board() {
  const { roomId } = useParams();

  const { slideNumber, setSlideNumber, slideTotal, setSlideTotal } =
    useContext(SlideContext);

  const [slides, setSlides] = useState([]);
  const [revealInitialize, setRevealInitialize] = useState(false);

  useEffect(() => {
    if (!revealInitialize && slides.length !== 0) {
      Reveal.initialize({
        backgroundTransition: "slide",
        transition: "slide",
        embedded: true,
        slideNumberBackgroundColor: "transparent",
      });
      setRevealInitialize(true);
      updateTotalSlides();

      Reveal.on("slidechanged", ({ indexh }) => {
        setSlideNumber(indexh);
        updateTotalSlides();
      });
    }
  }, [slides, revealInitialize, updateTotalSlides, setSlideNumber]);

  //Update slides array
  useEffect(() => {
    const slideRef = ref(db, `room/${roomId}/slide`);
    onValue(slideRef, (snapshot) => {
      const data = snapshot.val();
      setSlides(data);
    });
  }, [roomId]);

  const updateTotalSlides = useCallback(() => {
    if (slides.length !== 0) {
      setSlideTotal(slides.length);
    }
  }, [setSlideTotal, slides.length]);

  const addPage = useCallback(() => {
    const uuid = uid();
    set(ref(db, `room/${roomId}/slide/${slideTotal}`), {
      htmlCode: "",
      uuid: uuid,
    });
    setSlideTotal(slideTotal + 1);
    Reveal.destroy();
    setRevealInitialize(false);
  }, [roomId, setSlideTotal, slideTotal]);

  const deletePage = useCallback(() => {
    set(ref(db, `room/${roomId}/slide/${slideTotal - 1}`), null);
    setSlideTotal(slideTotal - 1);
    Reveal.destroy();
    setRevealInitialize(false);
  }, [roomId, setSlideTotal, slideTotal]);

  return (
    <>
      <Stack direction="row" className="add-buttons" spacing={2}>
        <Button variant="contained" color="success" onClick={addPage}>
          Ajouter une page
        </Button>
        {slideNumber > 0 && (
          <Button variant="contained" color="error" onClick={deletePage}>
            Supprimer la dernière page
          </Button>
        )}
      </Stack>
      <div className="reveal">
        <div className="slides">
          {slides.length !== 0 &&
            slides.map((slide, index) => (
              <section key={index}>{parse(slide.htmlCode)}</section>
            ))}
        </div>
      </div>
    </>
  );
}

export default Board;
