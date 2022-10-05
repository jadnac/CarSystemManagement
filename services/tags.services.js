const Cars = require('../models/cars.models')
const tags = require('../models/tags.models')

module.exports = {
    async addTag(data) {
        try {
            let tag = await tags.create(data)
            return tag
        } catch (err) {
            console.log('Error Creating Tag Services ' + err)
        }
    },

    async deleteTag(id) {
        try {
            console.log(id)
            let tagDeleted = await tags.deleteOne({ _id: id })
            if (tagDeleted) {
                let tryout = await Cars.find({ tag_id: id })
                let tryasd = await Cars.updateMany({ id: tryout?._id }, { $pull: { tag_id: id } })
                return { tryasd, tagDeleted }
            }
        } catch (err) {
            console.log('Error Delete Tag Services ' + err)
        }
    }
}