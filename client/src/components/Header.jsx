import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import IconButton from '@mui/joy/IconButton';
import Person from '@mui/icons-material/Person';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = ({ cartCount, setCartCount }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/active', { withCredentials: true });
        if (response.data && response.data.length > 0) {
          // Calculate total quantity of flowers in the order
          const totalQuantity = response.data[0].flowers.reduce((acc, item) => acc + item.quantity, 0);
          setCartCount(totalQuantity);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch active order:", error);
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, [setCartCount]);

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <header className={styles.header}>
      <div className={styles.websiteTitle}>Website Title</div>
      <div className={styles.categories}>
        <span>Category 1</span>
        <span>Category 2</span>
        <span>Category 3</span>
      </div>
      <div className={styles.icons}>
        <IconButton aria-label="person">
          <Person />
        </IconButton>
        <div className={styles.cartIconContainer} onClick={goToCart}>
          <IconButton aria-label="shopping cart">
            <ShoppingCart />
          </IconButton>
          {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;
