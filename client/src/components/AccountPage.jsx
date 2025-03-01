import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import styles from './AccountPage.module.css';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

const AccountPage = ({ cartCount, setCartCount }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authResponse = await axios.get('http://localhost:5000/api/checkAuth', { withCredentials: true });
        const userId = authResponse.data.user._id;
        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, { withCredentials: true });
        setUser(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders', { withCredentials: true });
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchUserData();
    fetchOrders();
  }, []);

  return (
    <>
      <Header cartCount={cartCount} setCartCount={setCartCount} />
      <Box className={styles.accountContainer}>
        {user ? (
          <Box className={styles.userInfo}>
            <Typography level="h4" fontWeight="bold" marginBottom={1}>User Information</Typography>
            <Typography><strong>First Name:</strong> {user.firstName}</Typography>
            <Typography><strong>Last Name:</strong> {user.lastName}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
          </Box>
        ) : (
          <Typography>Loading user information...</Typography>
        )}

        <Box>
          <Typography level="h5" fontWeight="bold" marginBottom={1}>Order History</Typography>
          <Table className={styles.orderTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>${order.total}</td>
                  <td>{order.status}</td>
                  <td>View Details</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default AccountPage;
