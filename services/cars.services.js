const Cars = require('../models/cars.models')
const categories = require('../models/category.models')
const tags = require('../models/tags.models')

const toRad = async (value) => {
    return value* Math.PI / 180
  }
module.exports = {
    async findAllCars(data) {
        try {
            if (data?.page_number && data?.num_per_page) {
                let carPagination = await Cars.find().sort({_id: 1})
                .skip(data?.page_number > 0 ? ((data?.page_number - 1) * data?.num_per_page) : 0)
                .limit(data?.num_per_page)
                return carPagination
            } else if (data?.car_search) {
                let carSearch = await Cars.find({ $text: { $search: data?.car_search } })
                return carSearch
            } else if (data?.category) {
                let cat = await categories.find({ category_name : data?.category})
                if(cat){
                    let carFilter = await Cars.find({ category_id : cat[0]?._id  })
                    return carFilter
                }
            }else if(data?.tag) {
                let tag = await tags.find({ tag_name: data?.tag})
                if(tag){
                    let carFilter = await Cars.find({ tag_id : tag[0]?._id})
                    return carFilter
                }
            }else {
                let carSort = await Cars.find({}).sort({ createdAt: 'desc'})
                return carSort
            }
        } catch (err) {
            console.log('Error Requested Cars:' + err)
        }
    },
    async viewCars() {
        try {
            let cars = await Cars.aggregate([
                { $group: { _id: "$category_id", cars:{ $first: "$car_name"},
                 car_location: {$first: "$car_location"},tag_id: {$first: "$tag_id"},
                 car_image: {$first: "$car_image"}, totalCars: { $sum: 1} }},
            ])
            return cars
        } catch (err) {
            console.log('Error Viewing Cars Service' + err)
        }
    },

    async addCar(data){
        try{
            let car = await Cars.create(data)
            return car
        }catch(err){
            console.log('Error Adding Car Service ' + err)
        }
    },

    async deleteCar(id){
        try{
            let deletedCar = await Cars.deleteOne({ _id: id})
            return deletedCar
        }catch(err){
            console.log('Error Deleting Car Services ' + err)
        }
    },
    async getNearestCar(data){
        try{
          let AllCars = await Cars.find({})
          for(let i in AllCars){
            let R = 6371;
            let distLatitude = await toRad(AllCars[i]?.car_location?.latitude - data?.latitude)
            let distLongitude = await toRad(AllCars[i]?.car_location?.longitude - data?.longitude)
            let carLatitude = await toRad(AllCars[i]?.car_location?.latitude);
            let carLatitude1 = await toRad(data?.latitude)
    
            let a = Math.sin(distLatitude/2) * Math.sin(distLatitude/2) + 
              Math.sin(distLongitude/2) * Math.sin(distLongitude/2) * Math.cos(carLatitude) * Math.cos(carLatitude1)
            
              let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 -a));
              let d = R * c
              if(d <= 10){
                return AllCars[i]
              }
          }
        }catch(err){
          console.log('Error Getting Nearest Car Services ' + err)
          return { error : err}
        }
      }

}