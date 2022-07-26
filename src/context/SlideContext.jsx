import React, { createContext, useState } from "react";

export const SlideContext = createContext();

const SlideContextProvider = props => {

    const [slideNumber, setSlideNumber] = useState(0);
    const [slideTotal, setSlideTotal] = useState(0);

    return (
        <SlideContext.Provider value={{ slideNumber, setSlideNumber, slideTotal, setSlideTotal}}>
            {props.children}
        </SlideContext.Provider>
    );
}

export default SlideContextProvider;