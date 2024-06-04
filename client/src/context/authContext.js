import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs
    );
    document.cookie = "access_token=" + res.data[1];
    setCurrentUser(res.data[0]);
  };
  const logout = async (inputs) => {
    var now = new Date();
    now.setMonth(now.getMonth() - 1);
    const res = await axios.post("http://localhost:8800/api/auth/logout");
    document.cookie = `access_token=;expires=${now.toUTCString()};Secure;`;
    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
