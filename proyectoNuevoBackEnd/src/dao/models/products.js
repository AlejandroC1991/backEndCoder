import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const productCollections = 'products';

export const productsSchema = new mongoose.Schema({
    title : String,
    description : String,
    code : String,
    price : Number,
    status : Boolean,
    stock : Number,
    category : String,
    id : Number,

});


productsSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollections, productsSchema);