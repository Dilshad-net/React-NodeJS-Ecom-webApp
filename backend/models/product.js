const mongoose = require('mongoose')
const validator = require('validator')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    price: {
        type: Number,
        trim: true,
        default: 0,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    brand: {
        type: String,
        trim: true,
        required: true
    },
    rating: {
        type: String
    },
    numrating: {
        type: Number,
        default: 0
    },
    incount: {
        type: Number,
        default: 0
    },
    image: {
        type: String /*Buffer*/
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product