export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }


    save = async (cart) => {
        const carts = await this.dao.save(cart);
        return carts;
    }

    getAll = async () => {
        const carts = await this.dao.getAll();
        return carts;
    }


    deleteCart = async (IDPasado) => {
        try {
            const deleteCart = await this.dao.deleteCart({
                idCarrito: IDPasado
            });
            return deleteCart;

        } catch (error) {
            console.log(error + 'error en la ruta');
        }

    }

    updateCarts = async (id, cart) => {
        const result = await this.dao.updateCarts({
            _id: id
        }, cart);
        return result;
    }

    getCartByID = async (IDPasado) => {
        const cartByID = await this.dao.getCartByID({
            idCarrito: IDPasado
        });
        return cartByID;

    }
}