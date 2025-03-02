import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import styles from './EditOrderPage.module.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Box from '@mui/joy/Box';

const EditOrderPage = ({ cartCount, setCartCount }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`, { withCredentials: true });
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const increaseQuantity = async (flowerId) => {
    try {
      await axios.post('http://localhost:5000/api/orders/increase', { orderId: order._id, flowerId: flowerId, quantity: 1 }, { withCredentials: true });
      const updatedOrder = await axios.get(`http://localhost:5000/api/orders/${orderId}`, { withCredentials: true });
      setOrder(updatedOrder.data);
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  const decreaseQuantity = async (flowerId) => {
    try {
      await axios.post('http://localhost:5000/api/orders/decrease', { orderId: order._id, flowerId: flowerId, quantity: 1 }, { withCredentials: true });
      const updatedOrder = await axios.get(`http://localhost:5000/api/orders/${orderId}`, { withCredentials: true });
      setOrder(updatedOrder.data);
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const handleSaveChanges = () => {
    navigate('/account');
  };

  return (
    <>
      <Header cartCount={cartCount} setCartCount={setCartCount} />
      <Box className={styles.editContainer}>
        <Typography level="h4" fontWeight="bold" marginBottom={2}>Edit Order</Typography>
        {order ? (
          <Box className={styles.orderContainer}>
            {order.flowers.map(item => (
              <Card key={item.flowerId._id} className={styles.cartItem}>
                <img src={item.flowerId.image_url} alt={item.flowerId.title} className={styles.flowerImage} />
                <Box className={styles.itemDetails}>
                  <Typography level="body1">{item.flowerId.title}</Typography>
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
            <Button className={styles.saveChangesButton} onClick={handleSaveChanges}>Save Changes</Button>
          </Box>
        ) : (
          <Typography>Loading order details...</Typography>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default EditOrderPage;
