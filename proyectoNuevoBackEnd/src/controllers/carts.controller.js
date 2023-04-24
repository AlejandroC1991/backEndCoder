import {
    save as saveCartService,
    getAll as getAllCartService,
    getProductByCode as getProductByCodeCartService,
    deleteProduct as deleteProductCartService,
   
} from '../services/products.services.js'

const getAll = async (req, res) => {
    try {
        const carts = await getAllCartService();
        res.send({ status: 'success', payload: carts });   
    } catch (error) {
        res.status(500).send({ error });
    }
};

const save = async (req, res) => {
    const { idCarrito, products } = req.body;

    if(!idCarrito || !products) return res.status(400).send({ status: 'error', error: 'Incomplete values' });

    try {
        const result = await saveCartService({
            idCarrito,
            products : [],
            
        });

        res.send({ result: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ error });
    }
}

const getProductByCode = async (req, res) => {
    try {
        const idCarrito = Number(req.params.idCarrito);
        const cartByID = await getProductByCodeCartService(idCarrito);
        if (!cartByID) return res.send({message:"NO EXISTE EL CARRITO"});
        
        res.send({
            status: 'success',
            payload: cartByID
        });
    } catch (error) {
        res.status(500).send({message:"hay un error"});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const cartID = Number(req.params.idCarrito);
        const cartBorrado = await deleteProductCartService(cartID);
    
       
        res.send({
            status: 'success',
            message: 'Carrito eliminado correctamente',
            payload: cartBorrado
        });
        } catch (error) {
            res.status(404).send({status: 'error', message: 'Producto no encontrado'});
        }


}


export {
    save,
    getAll,
    getProductByCode,
    deleteProduct,
    
}