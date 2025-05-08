import { createContext, useContext, useState, useEffect } from "react";

import Login from "./Login";
import Logout from "./Logout";
import GetCSRF from "./GetCSRF";
import CheckAuth from "./CheckAuth";
import Signup from "./Signup";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) return;
  
    const fetchData = async () => {
      await GetCSRF();
      const loggedInUser = await CheckAuth();
      setUser(loggedInUser);
      setChecked(true);
    };

    fetchData();
  }, [checked]);

  async function login(email, password) {
    try {
      const result = await Login(email, password);
      setUser(result.data.user);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      const result = await Logout();
      setUser(null);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function signup(name, email, password, password2) {
    try {
      const result = await Signup(name, email, password, password2);
      await login(email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );

}

export default function useAuth() {
  return useContext(AuthContext);
}
