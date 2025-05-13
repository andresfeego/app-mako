import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logueado, setLogueado] = useState(false);

  return (
    <AuthContext.Provider value={{ logueado, setLogueado }}>
      {children}
    </AuthContext.Provider>
  );
};
 