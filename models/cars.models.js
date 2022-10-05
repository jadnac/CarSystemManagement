const { Decimal128, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const CarsSchema = new mongoose.Schema({
    car_name: {
        type: String,
        required: true
    },
    id: {
        type: ObjectId,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    car_image: {
        type: Array,
        required: true
    },
    car_location: {
        longitude: {
            type: Decimal128,
            required: true
        },
        latitude: {
            type: Decimal128,
            required: true
        },
    },
    tag_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now,
      }
},
    { collection: "cars" })
// CarsSchema.index({ car_name: 'text' })
const Cars = mongoose.model("CarsSchema", CarsSchema);
module.exports = Cars
