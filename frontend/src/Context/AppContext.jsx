import { createContext, useState } from "react";
export const AppContext=createContext();
export default function AppContextProvider({children}) {
    
    const[data,setData]=useState({})
    const[token,setToken]=useState("")

     return  <AppContext.Provider value={{data,setData,token,setToken}}>
                {children}
            </AppContext.Provider>
}

