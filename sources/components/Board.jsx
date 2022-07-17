import React, { useEffect, useContext } from "react";

import Reveal from "reveal.js";
import parse from 'html-react-parser';

import { EditorContext } from "../context/EditorContext";

import "../../styles/slides.css";
import "../../node_modules/reveal.js/dist/reveal.css";
import "../../node_modules/reveal.js/dist/theme/night.css";

const Board = () => {

  const { htmlCode } = useContext(EditorContext);

  useEffect(() => {
    let deck = new Reveal({
      backgroundTransition: "slide",
      transition: "slide",
      embedded: true,
    });
    deck.initialize();
  }, []);

  return (
    <>
      <div className="reveal">
        <div className="slides">
          <section>
            <h1>Slide 1</h1>
          </section>
          <section>
            <h1>Slide 2</h1>
          </section>
          {parse(htmlCode)}
        </div>
      </div>
    </>
  );
};

export default Board;
