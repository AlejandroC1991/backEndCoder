import { CARTSDAO } from "../dao/index.js";

const save = async(cart) => {
    await CARTSDAO.save(cart);
    return cart;
}

const getAll = async () => {
    const carts = await CARTSDAO.getAll();
    return carts;
}


// const getProductByCode = async (codigoPasado) => {
//     const productByCode = await CARTSDAO.getProductByCode({code:codigoPasado });
//     return productByCode;

// }

const deleteCart = async (IDPasado) => {
    try {
        const deleteCart = await CARTSDAO.deleteCart({idCarrito:IDPasado });
        return deleteCart;
    
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
    return cartByID;

}

export {
    save,
    getAll,
    // getProductByCode,
    deleteCart,
    update,
    getCartByID
}