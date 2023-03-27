import { cartModel } from '../models/carts.js';

export default class Carts {
    constructor() {
        console.log('Carts con DB en Mongo');
    }

    
    getAll = async () => {
        const carts = await cartModel.find();
        return carts.map(cart => cart.toObject());
    }

    save = async (cart) => {
        const result = await cartModel.create(cart);
        return result;
    }

    update = async (id, cart) => {
        const result = await cartModel.updateOne({_id: id}, cart);
        return result;
    }
}

