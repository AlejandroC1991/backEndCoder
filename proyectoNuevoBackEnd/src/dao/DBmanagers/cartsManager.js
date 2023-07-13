import {
    cartModel
} from './models/carts.js';

export default class Carts {
    constructor() {
        console.log('Carts con DB en Mongo');
    }
    getAll = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    }
    save = async (cart) => {
        return await cartModel.create(cart);
    }
    update = async (id, cart) => {
        return await cartModel.updateOne({
            idCarrito: id
        }, cart);
    }
    getCartByID = async (IDPasado) => {
        try {
            return await cartModel.findOne(IDPasado);
        } catch (error) {
            console.log(error + 'error en la ruta carts manager mongoDB');
        }
    }
    deleteCart = async (IDABorrar) => {
        try {
            return await cartModel.deleteOne(IDABorrar);
        } catch (error) {
            console.log(error + 'error en la ruta');
        }
    }
    addProductToCart = async (id, cart) => {
        return await cartModel.updateOne({
            idCarrito: id
        }, cart);
    }
}