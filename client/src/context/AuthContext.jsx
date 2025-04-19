import { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext); 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Keep user logged in on reload
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );

}