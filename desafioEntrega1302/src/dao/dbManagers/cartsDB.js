import { cartModel } from '../models/cartsDB.js';

export default class Carts {
    constructor() {
        console.log('Working carts with DB in mongoDB');
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

