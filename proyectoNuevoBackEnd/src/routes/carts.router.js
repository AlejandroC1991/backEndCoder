import Router from './router.js';
import Carts from '../dao/DBmanagers/cartsManager.js';
import {
    save,
    getAll,
    getCartByID,
    deleteCart,
    updateCart

} from '../controllers/carts.controller.js';

const cartsManager = new Carts();

export default class CartsRouter extends Router {
    init() {
        this.get('/', ["PUBLIC"], null, getAll)
        this.get('/:code', ["PUBLIC"], null, getCartByID)
        this.post('/', ["PUBLIC"], null, save)
        this.put('/:cartID/product/productID', ["PUBLIC"], null, updateCart)
        this.delete('/:code', ["PUBLIC"], null, deleteCart)

    };
};