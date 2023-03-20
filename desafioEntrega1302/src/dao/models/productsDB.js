import mongoose from 'mongoose';

const productCollections = 'products';

const productsSchema = new mongoose.Schema({
    title : String,
    description : String,
    code : String,
    price : Number,
    status : Boolean,
    stock : Number,
    category : String,
    id : Number,

});

export const productModel = mongoose.model(productCollections, productsSchema);