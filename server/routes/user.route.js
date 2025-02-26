const userController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/register' , userController.register);
    app.post('/api/login' , userController.login);
    app.get('/api/logout' , authenticate, userController.logout);
}