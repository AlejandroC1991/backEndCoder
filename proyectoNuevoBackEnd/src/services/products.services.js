import { PRODUCTSDAO } from "../dao/index.js";

const save = async(user) => {
    await PRODUCTSDAO.save(user);
    return user;
}

const getAll = async () => {
    const users = await PRODUCTSDAO.getAll();
    return users;
}


const getProductByCode = async (codigoPasado) => {
    const productByCode = await PRODUCTSDAO.getProductByCode({code:codigoPasado });
    return productByCode;

}

const deleteProduct = async (codeABorrar) => {
    try {
        const traerProducto = await PRODUCTSDAO.deleteProduct({code:codeABorrar });
        return traerProducto;
    
    } catch (error) {
        console.log(error + 'error en la ruta');
    }

}

const updateByCode = async (codigoPasado, product) => {
    const result = await PRODUCTSDAO.updateByCode({code: codigoPasado}, product );
    return result;
}

export {
    save,
    getAll,
    getProductByCode,
    deleteProduct,
    updateByCode
}