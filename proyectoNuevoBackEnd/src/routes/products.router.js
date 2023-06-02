import Router from './router.js';
import Products from '../dao/DBmanagers/productsManager.js';
import {
    save,
    getAll,
    getProductByCode,
    deleteProduct,
    updateByCode
} from '../controllers/products.controller.js';

const productsManager = new Products();

export default class ProductsRouter extends Router {
    init() {
        this.get('/', ["PUBLIC"], null, getAll)
        this.get('/:code', ["PUBLIC"], null, getProductByCode)
        this.post('/', ["PUBLIC"], null, save)
        this.delete('/:code', ["PUBLIC"], null, deleteProduct)
        this.put('/:code', ["PUBLIC"], null, updateByCode)
    };
};