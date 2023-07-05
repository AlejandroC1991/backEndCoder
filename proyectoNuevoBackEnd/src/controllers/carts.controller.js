import * as cartsService from '../services/carts.services.js';
import {
    IncorrectLoginCredentials,
    UserNotFound
} from '../../utils/customExceptions.js';

const getAll = async (req, res) => {
    try {
        const carts = await cartsService.getAllCartService();
        res.send({
            status: 'success',
            payload: carts
        });
    } catch (error) {
        res.status(500).send({
            error
        });
    }
};

const save = async (req, res) => {
    const {
        idCarrito,
        products
    } = req.body;

    if (!idCarrito || !products) return res.status(400).send({
        status: 'error',
        error: 'Incomplete values'
    });

    try {
        const result = await cartsService.saveCartService({
            idCarrito,
            products: [],

        });

        res.send({
            result: 'success',
            payload: result
        });
    } catch (error) {
        res.status(500).send({
            error
        });
    }
}

const getCartByID = async (req, res) => {
    try {
        const idCarrito = Number(req.params.idCarrito);
        const cartByID = await cartsService.getCartByIDCartService(idCarrito);
        if (!cartByID) return res.send({
            message: "NO EXISTE EL CARRITO"
        });

        res.send({
            status: 'success',
            payload: cartByID
        });
    } catch (error) {
        res.status(500).send({
            message: "hay un error en carts"
        });
    }
}

const deleteCart = async (req, res) => {
    try {
        const cartID = Number(req.params.idCarrito);
        const cartBorrado = await cartsService.deleteCartService(cartID);


        res.send({
            status: 'success',
            message: 'Carrito eliminado correctamente',
            payload: cartBorrado
        });
    } catch (error) {
        res.status(404).send({
            status: 'error',
            message: 'Producto no encontrado'
        });
    }


}

const updateCart = async (req, res) => {
    try {
        const {
            cartID,
            productID
        } = req.params;
        const product = await productsManager.getProductByCode(productID);
        if (!product) return res.sendNotFoundError('producto no encontrado');

        const cart = await cartsManager.getCartByID(cartID);

        if (!cart) return res.sendNotFoundError('carrito no encontrado');

        product.carts.push({
            cart: cartID
        });

        const result = await productsManager.updateByCode(productID, product);

        res.sendSuccess(result);
    } catch (error) {

    }


}


export {
    save,
    getAll,
    getCartByID,
    deleteCart,
    updateCart,
}