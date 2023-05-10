import { productModel } from './models/products.js';

export default class Products {
    constructor() {
        console.log('Products con DB en Mongo');
    }

    
    getAll = async () => {
        const products = await productModel.find();
        return products.map(product => product.toObject());
    }

    save = async (product) => {
        return await productModel.create(product);
    }

    getProductByCode = async (codigoPasado) => {
        return await productModel.findOne(codigoPasado);
    }

    deleteProduct = async (codeABorrar) => {
        try {
            return await productModel.deleteOne(codeABorrar);
        
        } catch (error) {
            console.log(error + 'error en la ruta');
        }
    }
    updateByCode = async (codigoPasado, product) => {
        return await productModel.updateOne({code: codigoPasado}, product );
    }

}
