import Router from './router.js';
import Carts from '../dao/DBmanagers/cartsManager.js';
import {
    getAll,
    save,
    getCartByID,
    deleteCart,
    deletedProductInCart,
    addProductToCart

} from '../controllers/carts.controller.js';

const cartsManager = new Carts();

export default class CartsRouter extends Router {
    init() {
        this.get('/', ["PUBLIC"], null, getAll)
        this.get('/:idCarrito', ["PUBLIC"], null, getCartByID)
        this.post('/', ["PUBLIC"], null, save)
        this.delete('/:idCarrito/products/:code', ["PUBLIC"], null, deletedProductInCart)
        this.put('/:idCarrito/products/:code', ["PUBLIC"], null, addProductToCart)
        this.delete('/:idCarrito', ["PUBLIC"], null, deleteCart)

    };
};