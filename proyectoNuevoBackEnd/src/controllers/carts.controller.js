import * as cartsService from '../services/carts.services.js';
import * as productsService from '../services/products.services.js';


const getAll = async (req, res) => {
    try {
        const carts = await cartsService.getAll();
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
        error: 'Valores incompletos, te falta el idCarrito o el producto'
    });

    try {
        const result = await cartsService.save({
            idCarrito,
            products,

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
        const cartByID = await cartsService.getCartByID(idCarrito);
        if (!cartByID) return res.send({
            message: "NO EXISTE EL CARRITO"
        });

        res.json({
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
        const cartBorrado = await cartsService.deleteCart(cartID);
        res.send({
            status: 'success',
            payload: cartBorrado
        });
    } catch (error) {
        res.status(404).send({
            status: 'error',
            message: 'Producto no encontrado'
        });
    }


}
const addProductToCart = async (req, res) => {
    try {
        const idCarrito = Number(req.params.idCarrito);
        const code = Number(req.params.code);
        const cart = await cartsService.getCartByID(idCarrito);

        if (!cart) {
            return res.sendNotFoundError('El carrito con ese ID no existe en la base de datos');
        }
        const productBD = await productsService.getProductByCode(code);
        if (!productBD) {
            return res.sendNotFoundError('El product con ese code no existe en la base de datos');
        }

        cart.products.push(productBD);
        await cartsService.update(idCarrito, cart);
        res.send(cart);
    } catch (error) {
        res.status(500).send({
            error
        });
    };
}

const deletedProductInCart = async (req, res) => {
    try {
        const idCarrito = Number(req.params.idCarrito);
        const code = Number(req.params.code);

        const cart = await cartsService.getCartByID(idCarrito);

        if (!cart) {
            return res.sendNotFoundError('El carrito con ese ID no existe en la base de datos');
        }

        const product = cart.products.find(product => product.code === code);

        if (!product) {
            return res.sendNotFoundError('El producto con ese CODE no existe en el carrito');
        }
        cart.products.splice(cart.products.indexOf(product), 1);
        await cartsService.update(idCarrito, cart);

        res.sendSuccess(cart);

        res.json({
            status: 'success',
            message: 'El carrito con ese ID existe',
            payload: cart
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'error'
        });
    }
};


export {
    save,
    getAll,
    getCartByID,
    deleteCart,
    deletedProductInCart,
    addProductToCart,
}