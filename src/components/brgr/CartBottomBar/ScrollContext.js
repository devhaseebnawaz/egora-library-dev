import React, { createContext, useContext, useRef } from 'react';

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const searchSectionRef = useRef(null);
  const searchInputRef = useRef(null);

  const scrollToSearch = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    searchInputRef.current?.focus();
  };

  return (
    <UIContext.Provider value={{ searchSectionRef, searchInputRef, scrollToSearch }}>
      {children}
    </UIContext.Provider>
  );
};
