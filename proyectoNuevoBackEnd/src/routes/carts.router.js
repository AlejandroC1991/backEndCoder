import Router from './router.js';
import Carts from '../dao/DBmanagers/cartsManager.js';
import {
    save,
    getAll,
    getCartByID,
    deleteCart

} from '../controllers/products.controller.js';

const cartsManager = new Carts();

export default class CartsRouter extends Router {
    init() {
        this.get('/', ["PUBLIC"], null, getAll)
        this.get('/:code', ["PUBLIC"], null, getCartByID)
        this.post('/', ["PUBLIC"], null, save)
        this.delete('/:code', ["PUBLIC"], null, deleteCart)

    };
};