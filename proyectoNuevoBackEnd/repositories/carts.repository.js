export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }


    save = async (cart) => {
        await this.dao.save(cart);
        return cart;
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

    update = async (id, cart) => {
        const result = await this.dao.update({
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