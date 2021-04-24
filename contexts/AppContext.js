import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider  = (props) =>{
    const [level, setLevel] = useState(null);
    return(
        <AppContext.Provider value={{
            category: [level, setLevel],
        }}>
            {props.children}
        </AppContext.Provider>
    )
}