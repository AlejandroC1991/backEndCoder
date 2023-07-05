import mongoose from 'mongoose';
import {
    productsSchema
} from './products.js';

const cartCollections = 'carts';


const cartsSchema = new mongoose.Schema({

    idCarrito: {
        type: Number,
        required: true

    },
    products: [productsSchema],

});

export const cartModel = mongoose.model(cartCollections, cartsSchema);