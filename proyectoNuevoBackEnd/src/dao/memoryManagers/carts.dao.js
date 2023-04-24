export default class CartsDao {
    constructor() {
        this.data = [];
    }

    getAll = async () => {
        return this.data;
    }

    save = async (cart) => {
        this.data.push(cart);
        return cart;
    }

    update = async (id, cart) => {
        return this.data(id, cart);
    }

    getCartByID = async (IDPasado) => {
        return this.data(IDPasado);

    }

    deleteProduct = async (IDABorrar) => {
        return this.data(IDABorrar);
    }
}