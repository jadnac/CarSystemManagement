const categoryController = require('../controller/category.controller')
const router = require('express').Router()
const { authenticateTokenAdmin } = require('../middlewares/authentication.middleware');

//Add Category
router.post('/create', authenticateTokenAdmin,  categoryController.AddCategory)

//Delete Category
router.delete('/:id', authenticateTokenAdmin, categoryController.DeleteCategory)

module.exports = router