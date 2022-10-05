const Cars = require('../models/cars.models')
const categories = require('../models/category.models')

module.exports = {
    async addCategory(data){
        try{
            let categ = await categories.findOne({ category_name : data?.category_name })
            if(categ){
                return { error: "Category Already Exists" }
            }else{
                let catego = categories.create(data)
                return catego
            }
        }catch(err){
            console.log('Error Adding Category Service ' + err)
        }
    },

    async deleteCategory(id){
        try{
            let categoryDelete = await categories.deleteOne({ _id : id})
            if(categoryDelete){
                let carDelete = await Cars.deleteMany({ category_id : id})
                return {categoryDelete, carDelete}
            }
        }catch(err){
            console.log('Error Deleting Category ' + err)
        }
    }

}