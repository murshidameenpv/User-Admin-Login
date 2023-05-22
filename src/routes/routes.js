const express = require('express')
const route = express.Router()
const services = require('../services/render')
const adminController = require('../controllers/admin-controller')
const userController = require('../controllers/user-controller')


//user
route.get('/', userController.checkLoggedIn, services.home);

route.get('/home', userController.checkLoggedIn,services.home);

route.get('/user-signup', services.userSignup);

route.get('/user-login', services.userLogin);

route.get('/logout', services.userLogout);


// ADMIN
route.get('/admin-login', services.adminLogin)

route.post('/admin-login', adminController.adminLogin)

route.get('/admin-view', services.adminView);

route.get('/admin-logout', adminController.adminLogout)

route.get('/admin-add-user', services.addUserAdmin);

route.get('/admin-update-user', services.updateUserAdmin);



//API FOR ADMIN CRUD
route.post('/api/admin/users', adminController.adminCreateUser);
route.get('/api/admin/users', adminController.adminFindUser);
route.put('/api/admin/users/:id', adminController.adminUpdateUser);
route.delete('/api/admin/users/:id', adminController.adminDeleteUser);


//API FOR USER
route.post('/api/user/signup', userController.userSignUp);
route.post('/api/user/login', userController.userLogin);
module.exports = route