import React, { createContext, useState } from "react";

export const ContextApi = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(10);

  return (
    <ContextApi.Provider value={{ user, setUser }}>
      {children}
    </ContextApi.Provider>
  );
};

export default AppProvider;
