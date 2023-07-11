import Router from './router.js';
import Carts from '../dao/DBmanagers/cartsManager.js';
import {
    getAll,
    save,
    getCartByID,
    deleteCart,
    updateCart

} from '../controllers/carts.controller.js';

const cartsManager = new Carts();

export default class CartsRouter extends Router {
    init() {
        this.get('/', ["PUBLIC"], null, getAll)
        this.get('/:idCarrito', ["PUBLIC"], null, getCartByID)
        this.post('/', ["PUBLIC"], null, save)
        this.put('/:idCarrito/products/:code', ["PUBLIC"], null, updateCart)
        this.delete('/:idCarrito', ["PUBLIC"], null, deleteCart)

    };
};