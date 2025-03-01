import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import axios from 'axios';
import StorePage from './components/StorePage';
import CartPage from './components/CartPage';
import AccountPage from './components/AccountPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/checkAuth', { withCredentials: true });
        // alert(response.data.verified)
        setIsAuthenticated(response.data.verified);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }

    };

    checkAuth();
  }, [isAuthenticated]);

  return (
    <>
        {/* {isAuthenticated ? <h1>True</h1> : <h1>False</h1>}   */}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <StorePage></StorePage> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={<AuthForm isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/cart" element={<CartPage cartCount={cartCount} setCartCount={setCartCount} />} />
        <Route path="/account" element={<AccountPage cartCount={cartCount} setCartCount={setCartCount} />} />
      </Routes>
    </>
  );
}

export default App;
