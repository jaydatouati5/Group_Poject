const userController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/users/:id', authenticate, userController.getOne);
    app.post('/api/register' , userController.register);
    app.post('/api/login' , userController.login);
    app.get('/api/logout' , authenticate, userController.logout);
    app.put('/api/users/:id', authenticate, userController.updateUser);
    app.get('/api/checkAuth', userController.checkAuth);
}