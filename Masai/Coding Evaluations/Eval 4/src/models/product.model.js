const mongoose = require('mongoose'); //importing mongoose

const productSchema = new mongoose.Schema({ //creating schema for products
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
    },
    colors: {
        type: Array,
        required: true,
    },
    usedBy: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

const Product = mongoose.model("products", productSchema); //linking products table and products schema

module.exports = Product; //exporting products model