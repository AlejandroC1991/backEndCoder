import  {PRODUCTSDAO}  from "../dao/index.js";

const save = async(product) => {
    await PRODUCTSDAO.save(product);
    return product;
}

const getAll = async () => {
    const products = await PRODUCTSDAO.getAll();
    return products;
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
    try {
        
        const result = await PRODUCTSDAO.updateByCode(codigoPasado, product );
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