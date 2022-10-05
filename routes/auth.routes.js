const authController = require('../controller/auth.controller')
const router = require('express').Router()
const { authenticateTokenAdmin } = require('../middlewares/authentication.middleware');

//Register
router.post('/register', authController.Register)

//Login
router.post('/login', authController.login)

//Disable/Enable User
router.post('/allow',authenticateTokenAdmin, authController.disEnabUser)

module.exports = router