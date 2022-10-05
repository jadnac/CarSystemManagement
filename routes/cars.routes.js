const router = require('express').Router()
const carsController = require('../controller/cars.controller')
const { authenticateTokenAdmin } = require('../middlewares/authentication.middleware');

//View list of available cars
router.post('/findallcars',carsController.findAllCars)

//view list of cars grouped by categories
router.get('/allcarsgroup',carsController.ViewCars)

//Add Car
router.post('/create',authenticateTokenAdmin, carsController.AddCar)

//Delete Car
router.delete('/:id',authenticateTokenAdmin, carsController.DeleteCar)

//List User's nearest cars available
router.post('/nearestcars',authenticateTokenAdmin, carsController.GetNearestCars)


module.exports = router