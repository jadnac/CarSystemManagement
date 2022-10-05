const { addCategory, deleteCategory } = require("../services/category.service")

module.exports = {
    AddCategory: async (req, res) => {
        try{
            const data = req.body
            await addCategory(data).then(response => {
                if(response.error){
                    return res.status(400).send({ error: response?.error })
                }else{
                    return res.status(200).send({ status: 200, message: 'Category Successfully Added'})
                }
            })
        }catch(err){
            console.log('Error Adding Category Controller ' + err)
        }
    },

    DeleteCategory: async (req, res) => {
        try{
            const {id} = req.params
            await deleteCategory(id).then(response => {
                if(response?.error){
                    return res.status(400).send({ error: response?.error })
                }else{
                    return res.status(200).send({ message: `${id} Deleted Successfully`})
                }
            })
        }catch(err){
            console.log('Error Deleting Category Controller ' + err)
        }
    }
}