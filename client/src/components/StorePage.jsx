import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import styles from './StorePage.module.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

const StorePage = () => {
  const [flowers, setFlowers] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flowers', { withCredentials: true });
        setFlowers(response.data);
      } catch (error) {
        console.error("Failed to fetch flowers:", error);
      }
    };

    fetchFlowers();
  }, []);

  const addToCart = async (flower) => {
    try {
      await axios.post(
        'http://localhost:5000/api/flowers/addToCart',
        { flowerId: flower._id, quantity: 1 },
        { withCredentials: true }
      );
      console.log(`${flower.title} added to cart`);
      setCartCount(cartCount + 1);
    } catch (error) {
      console.error("Failed to add flower to cart:", error);
    }
  };

  return (
    <>
      <Header cartCount={cartCount} setCartCount={setCartCount} />
      <div className={styles.flowerGrid}>
        {flowers.map(flower => (
          <Card key={flower.id} sx={{ width: 250, maxWidth: '100%', boxShadow: 'md', borderRadius: 'md' }}>
            
              <img
                src={flower.image_url}
                alt={flower.title}
                style={{ objectFit: 'cover', width: '100%', height: '200px', marginBottom: '10px' }}
              />
            
            <CardContent sx={{ pt: 1 }}>    
              <Typography level="h6" fontWeight="md" mb={0.5} sx={{fontSize: '1rem'}}>
                {flower.title}
              </Typography>
              <Typography fontSize="lg" textColor="#007bff" sx={{fontWeight: 'bold'}}>
                ${flower.price}
              </Typography>
              <Button variant="solid" color="primary" sx={{ mt: 1, fontSize: '0.9rem' }} onClick={() => addToCart(flower)}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default StorePage;
