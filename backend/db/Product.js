const mongoose = require('mongoose');
const { schema } = require('./User');

const productsSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
});

module.exports = mongoose.model('products',productsSchema)