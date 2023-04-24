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
        const result = await productModel.create(product);
        return result;
    }

    getProductByCode = async (codigoPasado) => {
        const productByCode = await productModel.findOne({code:codigoPasado });

        return productByCode.toObject();

    }

    deleteProduct = async (codeABorrar) => {
        try {
            const traerProducto = await productModel.deleteOne({code:codeABorrar });
            return traerProducto;
        
        } catch (error) {
            console.log(error + 'error en la ruta');
        }

    }

    updateByCode = async (codigoPasado, product) => {
        const result = await productModel.updateOne({code: codigoPasado}, product );
        return result;
    }

}
