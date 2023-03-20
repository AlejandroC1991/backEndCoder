import { cartsModel } from '../models/cartsDB';

export default class Carts {
    constructor() {
        console.log('Working carts with DB in mongoDB');
    }

    
    getAll = async () => {
        const carts = await cartsModel.find();
        return carts.map(cart => cart.toObject());
    }

    save = async (cart) => {
        const result = await cartsModel.create(cart);
        return result;
    }

    update = async (id, cart) => {
        const result = await cartsModel.updateOne({_id: id}, cart);
        return result;
    }
}