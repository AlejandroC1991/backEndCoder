import { productModel } from '../models/productsDB';

export default class Products {
    constructor() {
        console.log('Working products with DB in mongoDB');
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