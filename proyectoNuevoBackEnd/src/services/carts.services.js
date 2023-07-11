import {
    Carts
} from "../dao/factory.js";
import CartsRepository from "../repositories/carts.repository.js";

const carts = new Carts();
const cartsRepository = new CartsRepository(carts);


const save = async (cart) => {
    await cartsRepository.save(cart);
    return cart;
}

const getAll = async () => {
    const carts = await cartsRepository.getAll();
    return carts;
}


const deleteCart = async (IDPasado) => {
    try {
        const deleteCart = await cartsRepository.deleteCart(IDPasado);
        if (deleteCart.deletedCount == 0) {
            return {
                message: "Ese ID de carrito NO existe en la base de datos"
            }
        }
        return deleteCart;

    } catch (error) {
        console.log(error + 'error en la ruta');
    }

}

const update = async (id, cart) => {
    const result = await cartsRepository.update({
        _id: id
    }, cart);
    return result;
}

const getCartByID = async (IDPasado) => {
    const cartByID = await cartsRepository.getCartByID(IDPasado);
    return cartByID;

}

export {
    save,
    getAll,
    deleteCart,
    update,
    getCartByID
}