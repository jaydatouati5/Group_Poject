const adminController = require('../controllers/admin.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/admin/register' , adminController.register);
    app.post('/api/admin/login' , adminController.login);
    app.get('/api/admin/logout' , authenticate, adminController.logout);
    app.put('/api/admin/users/:id', authenticate, adminController.updateAdmin);
    app.get('/api/admin/checkAuth', adminController.checkAuth);
}
