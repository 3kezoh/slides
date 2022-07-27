import React, { createContext, useState } from "react";

export const SlideContext = createContext();

export function SlideProvider({ children }) {
  const [slideNumber, setSlideNumber] = useState(0);
  const [slideTotal, setSlideTotal] = useState(0);

  return (
    <SlideContext.Provider
      value={{ slideNumber, setSlideNumber, slideTotal, setSlideTotal }}
    >
      {children}
    </SlideContext.Provider>
  );
}

export default SlideProvider;
