import { productModel } from '../models/products.js';

export default class Products {
    constructor() {
        console.log('Products con DB en Mongo');
    }

    
    getAll = async () => {
        const products = await productModel.find();
        return products.map(product => product.toObject());
    }

    save = async (product) => {
        const result = await productModel.create(product);
        return result;
    }
}