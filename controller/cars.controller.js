const { findAllCars, viewCars, addCar, deleteCar, getNearestCar } = require('../services/cars.services')
module.exports = {
    findAllCars: async (req, res) => {
        try {
            const data = req.body
            await findAllCars(data).then(response => {
                if (response.error) {
                    return res.status(400).send({ error: response?.error })
                } else {
                    return res.status(200).send({ data: response, message: 'Cars Found' })
                }
            })
        } catch (err) {
            console.log('Error in controller find all cars ' + err)
        }
    },
    
    ViewCars: async (req, res) => {
        try{
            await viewCars().then(response => {
                if(response.error){
                    return res.status(400).send({error: response.error})
                }else{
                    return res.status(200).send({data: response, message: "Cars Found"})
                }
            })
        }catch(err){
            console.log('Error Viewing Car Controller ' + err)
        }
    },


    AddCar: async (req, res) => {
        try{
            const data = req.body
            await addCar(data).then(response => {
                if(response.error){
                    return res.status(400).send({ error: response.error })
                }else{
                    return res.status(200).send({data: response, message: 'Car Added Succesfully'})
                }
            })
        }catch(err){
            console.log('Error Adding Car Controller ' + err)
        }
    },

    DeleteCar: async (req, res) => {
        try{
            const {id} = req.params
            await deleteCar(id).then(response => {
                if(response?.error){
                    return res.status(400).send({ error: response?.error })
                }else{
                    return res.status(200).send({ message: `Car ${id} Deleted Successfully`})
                }
            })
        }catch(err){
            console.log('Error Deleting Car Controller ' + err)
        }
    },

    GetNearestCars: async (req, res) => {
        const data = req.body
        await getNearestCar(data).then(response => {
            if(response?.error){
                return res.status(400).send({ error: response?.error})
            }else{
                return res.status(200).send({ data:response, message: 'Nearest Cars Found'})
            }
        })
    }
}