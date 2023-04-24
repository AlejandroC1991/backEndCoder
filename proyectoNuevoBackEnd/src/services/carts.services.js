import { CARTSDAO } from "../dao/index.js";

const save = async(user) => {
    await CARTSDAO.save(user);
    return user;
}

const getAll = async () => {
    const users = await CARTSDAO.getAll();
    return users;
}


const getProductByCode = async (codigoPasado) => {
    const productByCode = await CARTSDAO.getProductByCode({code:codigoPasado });
    return productByCode;

}

const deleteProduct = async (codeABorrar) => {
    try {
        const traerCart = await CARTSDAO.deleteProduct({code:codeABorrar });
        return traerCart;
    
    } catch (error) {
        console.log(error + 'error en la ruta');
    }

}

const update = async (id, cart) => {
    const result = await CARTSDAO.update({_id: id}, cart);
    return result;
}

const getCartByID = async (IDPasado) => {
    const cartByID = await CARTSDAO.getCartByID({idCarrito:IDPasado });

    return cartByID.toObject();

}

export {
    save,
    getAll,
    getProductByCode,
    deleteProduct,
    update,
    getCartByID
}