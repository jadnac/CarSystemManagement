const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    tag_name: {
        type: String,
        required: true
    }
},
    { collection: "tags" })

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag
