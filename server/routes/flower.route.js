const FlowerController = require('../controllers/flower.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/flowers',authenticate, FlowerController.createFlower);
    app.get('/api/flowers', authenticate, FlowerController.getAllFlowers);
    app.get('/api/flowers/:id', FlowerController.getFlowerById);
    app.put('/api/flowers/:id',authenticate, FlowerController.updateFlower);
    app.delete('/api/flowers/:id',authenticate, FlowerController.deleteFlower);
    app.post('/api/flowers/addToCart', authenticate, FlowerController.addToCart);
    app.get('/api/flowers/popular', FlowerController.getMostPopularFlower);
}
