import React,{ createContext, useContext, useState} from "react";

const SearchContext = createContext();

export function useSearch(){
    return useContext(SearchContext);  //retorna o valor do contexto creado encima.
}

export function SearchProvider({ children }) {
    const [search, setSearch]= useState('');

    const handleSearch = (query)=>{
        if (query !== search) {
            
            setSearch(query)
        }
    };
    return(
        <SearchContext.Provider value={{ search ,handleSearch, setSearch}}>
            {children}
        </SearchContext.Provider>
    );
}