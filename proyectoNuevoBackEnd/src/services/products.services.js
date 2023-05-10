import  {PRODUCTSDAO}  from "../dao/index.js";

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