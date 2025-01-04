import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser({ ...userData, token });
    setIsAuthenticated(true);
    // navigate("/dashboard"); // Assuming successful login leads to dashboard
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  // Optionally, you might want to check for token existence on initial load:
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Here you might want to attempt an authenticated request to fetch user data
      // but since we're not doing explicit token verification:
      setIsAuthenticated(true);
      // If you have a route to fetch user profile:
      // fetchUserProfile().then(profile => setUser({ ...profile, token }));
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};