// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Buat konteks autentikasi
const AuthContext = createContext();

// Penyedia konteks autentikasi
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Validasi props untuk AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook kustom untuk menggunakan konteks autentikasi
export const useAuth = () => useContext(AuthContext);
