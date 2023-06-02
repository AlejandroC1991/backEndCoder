import {
    Products
} from "../dao/factory.js";
import ProductsRepository from "../../repositories/products.repository.js";

const products = new Products();
const productsRepository = new ProductsRepository(products);


const save = async (product) => {
    await productsRepository.save(product);
    return products;
}

const getAll = async () => {
    const products = await productsRepository.getAll();
    return products;
}


const getProductByCode = async (codigoPasado) => {
    const productByCode = await productsRepository.getProductByCode({
        code: codigoPasado
    });
    return productByCode;

}

const deleteProduct = async (codeABorrar) => {
    try {
        const traerProducto = await productsRepository.deleteProduct({
            code: codeABorrar
        });
        return traerProducto;

    } catch (error) {
        console.log(error + 'error en la ruta');
    }

}

const updateByCode = async (codigoPasado, product) => {
    try {

        const result = await productsRepository.updateByCode(codigoPasado, product);
        console.log(codigoPasado)
        return result;

    } catch (error) {
        console.log(error + 'ERROR : NO SE ACTUALIZO EL PRODUCTO ');
    }
}

export {
    save,
    getAll,
    getProductByCode,
    deleteProduct,
    updateByCode
}