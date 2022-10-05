const { addTag, deleteTag } = require("../services/tags.services")

module.exports = {
    AddTag: async (req, res) => {
        try{
            const data = req.body
            await addTag(data).then(response => {
                if(response?.error){
                    return res.status(400).send({ error: response?.error })
                }else{
                    return res.status(200).send({ data: response, message: 'Tag Created Successfully' })
                }
            })
        }catch(err){
            console.log('Error Creating Tag Controller ' + err)
        }
    },

    DeleteTag: async (req, res) => {
        try{
            const {id} = req.params
            await deleteTag(id).then(response => {
                if(response?.error){
                    return res.status(400).send({ error: response?.error})
                }else{
                    return res.status(200).send({ message: `Tag ${id} Deleted Successfully`})
                }
            })
        }catch(err){
            console.log('Error Deleting Tag Controller ' + err)
        }
    }
}