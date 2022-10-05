const tagsController = require('../controller/tags.controller')
const router = require('express').Router()
const { authenticateTokenAdmin } = require('../middlewares/authentication.middleware');

//Add Tag
router.post('/create', authenticateTokenAdmin, tagsController.AddTag)

//Delete Tag
router.delete('/:id', authenticateTokenAdmin, tagsController.DeleteTag)

module.exports = router