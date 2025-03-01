import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import styles from './CartPage.module.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Box from '@mui/joy/Box';

const CartPage = ({ cartCount, setCartCount }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/active', { withCredentials: true });
        if (response.data && response.data.length > 0) {
          setOrder(response.data[0]);
        } else {
          setOrder(null);
        }
      } catch (error) {
        console.error("Failed to fetch active order:", error);
      }
    };

    fetchOrder();
  }, []);

  const increaseQuantity = async (flowerId) => {
    try {
      await axios.post('http://localhost:5000/api/orders/increase', { orderId: order._id, flowerId: flowerId, quantity: 1 }, { withCredentials: true });
      setCartCount(cartCount + 1);
      const updatedOrder = await axios.get('http://localhost:5000/api/orders/active', { withCredentials: true });
      setOrder(updatedOrder.data[0]);
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  const decreaseQuantity = async (flowerId) => {
    try {
      await axios.post('http://localhost:5000/api/orders/decrease', { orderId: order._id, flowerId: flowerId, quantity: 1 }, { withCredentials: true });
      setCartCount(cartCount - 1);
      const updatedOrder = await axios.get('http://localhost:5000/api/orders/active', { withCredentials: true });
      setOrder(updatedOrder.data[0]);
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const purchaseOrder = async () => {
    try {
      await axios.put(`http://localhost:5000/api/orders/purchase/${order._id}`, {}, { withCredentials: true });
      console.log("Order purchased successfully");
      setOrder(null);
      setCartCount(0); // Reset cart count after purchase
    } catch (error) {
      console.error("Failed to purchase order:", error);
    }
  };

  return (
    <>
      <Header cartCount={cartCount} setCartCount={setCartCount} />
      <Box className={styles.cartContainer}>
        {order ? (
          <Box className={styles.orderContainer}>
            {order.flowers.map(item => (
              <Card key={item.flowerId._id} className={styles.cartItem}>
                <img src={item.flowerId.image_url} alt={item.flowerId.title} className={styles.flowerImage} />
                <Box className={styles.itemDetails}>
                  <Typography>{item.flowerId.title}</Typography>
                  <Box className={styles.quantityPrice}>
                    <Box className={styles.quantityControls}>
                      <IconButton size="sm" onClick={() => decreaseQuantity(item.flowerId._id)} aria-label="Reduce quantity">
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton size="sm" onClick={() => increaseQuantity(item.flowerId._id)} aria-label="Increase quantity">
                        <Add />
                      </IconButton>
                    </Box>
                    <Typography>${item.flowerId.price * item.quantity}</Typography>
                  </Box>
                </Box>
              </Card>
            ))}
            <Typography className={styles.total}>Total: ${order.total}</Typography>
            <Button className={styles.purchaseButton} onClick={purchaseOrder}>Purchase</Button>
          </Box>
        ) : (
          <Typography className={styles.emptyCart}>Your cart is empty.</Typography>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default CartPage;
