import * as cartsService from '../services/carts.services.js';


const getAll = async (req, res) => {
    try {

        const carts = await cartsService.getAll();
        res.send({
            status: 'success',
            payload: carts
        });
    } catch (error) {
        console.log(error + "aca esta el error");
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
        console.log(error + "aca esta el error")

    }
}

const getCartByID = async (req, res) => {
    try {
        const idCarrito = Number(req.params.idCarrito);
        console.log(req.params.idCarrito + "aca esta el id del carrito")
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

const updateCart = async (req, res) => {
    const {
        idCarrito,
        products,
    } = req.body;
    if (!idCarrito || !products) return res.status(400).send({
        status: 'error',
        error: 'Te falta el idCarrito o los productos'
    });


    try {
        const {
            idCarrito,
            products
        } = req.params;
        console.log(req.params + "aca estan los params")

        const product = await productsManager.getProductByCode(products);
        console.log(product + "que tenemos aca?")
        if (!product) return res.sendNotFoundError('producto no encontrado');

        const cart = await cartsManager.getCartByID(idCarrito);

        if (!cart) return res.sendNotFoundError('carrito no encontrado');

        product.carts.push({
            cart: idCarrito
        });

        const result = await productsManager.updateByCode(products, product);

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