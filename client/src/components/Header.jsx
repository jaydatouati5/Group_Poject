import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import IconButton from '@mui/joy/IconButton';
import Person from '@mui/icons-material/Person';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = ({ cartCount, setCartCount }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleLogout = () => {
    axios.get('http://localhost:5000/api/logout', { withCredentials: true })
      .then(res => {
        console.log("Logged out successfully");
        navigate('/auth');
      })
      .catch(err => console.error("Logout failed:", err));
    handleClose();
  };

  const goToAccount = () => {
    navigate('/account');
    handleClose();
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/active', { withCredentials: true });
        if (response.data && response.data.length > 0) {
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
      <div className={styles.websiteTitle}>Floral Heaven </div>
      <div className={styles.categories}>
        <span onClick={(e) => {navigate("/")}}>Home</span>
        <span>Category 1</span>
        <span>Category 2</span>
        <span>Category 3</span>
      </div>
      <div className={styles.icons}>
        <IconButton aria-label="person" id="user-menu-button" aria-controls="user-menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
          <Person />
        </IconButton>
        <Menu id="user-menu" anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ minWidth: 200 }}>
          <MenuItem onClick={goToAccount}>
            <ListItemDecorator>
              <AccountCircle />
            </ListItemDecorator>
            Account
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>
            <ListItemDecorator sx={{ color: 'red' }}>
              <Logout />
            </ListItemDecorator>
            Logout
          </MenuItem>
        </Menu>
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
