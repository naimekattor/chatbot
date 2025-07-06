"use client";
import { createContext, useState } from "react";
export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  
  const userInfo = {
    user,
    setUser,
  };
  return (
    <authContext.Provider value={userInfo}>{children}</authContext.Provider>
  );
};
export default AuthProvider;