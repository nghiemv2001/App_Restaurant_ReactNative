import React, { createContext, useState } from 'react';
export const SateContext = createContext()
export const SateProvider = ({children}) => {
    const [currentName, setCurrentName] = useState(null);
    const [currentID, setCurrentID] = useState(null)
    const setName = (name) => {
        setCurrentName(name);
    }
    const setID=(id)=>{
        setCurrentID(id)
    }
    const nameValue = {
        currentName,
        setName,
        currentID,
        setID
    };
    return(
        <SateContext.Provider value={nameValue}>
        {children}
      </SateContext.Provider>
    )
};