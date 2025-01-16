import { createContext, useContext } from "react";
const CitiesContext = createContext();

const CitiesProvider = function ({ children }) {
    // useState, useReducer, useEffect

    const valuesObj = { cities: [] };

    return (
        <CitiesContext.Provider value={valuesObj}>
            {children}
        </CitiesContext.Provider>
    );
};

const useCities = function () {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("Trying to access context ouside ther provider");
    return context;
};

export { CitiesProvider, useCities };
