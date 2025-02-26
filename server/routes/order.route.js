const OrderController = require('../controllers/order.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/orders', authenticate, OrderController.createOrder);
    app.get('/api/orders', authenticate, OrderController.getAllOrders);
    app.delete('/api/orders/:id', authenticate, OrderController.deleteOrder);
    app.post('/api/orders/decrease', authenticate, OrderController.decreaseProductQuantity);
    app.post('/api/orders/increase', authenticate, OrderController.increaseProductQuantity);
    app.put('/api/orders/purchase/:id', authenticate, OrderController.purchaseOrder);
    app.put('/api/orders/cancel/:id', authenticate, OrderController.cancelOrder);
    app.put('/api/orders/deliver/:id', authenticate, OrderController.deliverOrder);
    app.get('/api/orders/active', authenticate, OrderController.getAllActiveOrders);
}
