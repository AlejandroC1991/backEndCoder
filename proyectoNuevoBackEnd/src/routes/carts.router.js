import { Router } from 'express';
import Carts from '../dao/managers/cartsManager.js';

const cartsManager = new Carts();
const router = Router();

router.get('/', async(req, res) => {
    try {
        const carts = await cartsManager.getAll();
        res.send({ status: 'success', payload: carts });   
    } catch (error) {
        res.status(500).send({ error });
    }
});

router.post('/', async(req, res) => {
    const { idCarrito, products } = req.body;

    if(!idCarrito || !products) return res.status(400).send({ status: 'error', error: 'Incomplete values' });

    try {
        const result = await cartsManager.save({
            idCarrito,
            products : [],
            
        });

        res.send({ result: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ error });
    }
});


router.get('/:idCarrito', async (req, res) => {
    
    try {
        const idCarrito = Number(req.params.idCarrito);
        const cartByID = await cartsManager.getCartByID(idCarrito);
        
        
        res.send({
            status: 'success',
            payload: cartByID
        });
    } catch (error) {
        res.status(500).send({message:"hay un error"});
    }
});

router.delete('/:idCarrito',async (req, res) => {
    try {
    const cartID = Number(req.params.idCarrito);
    const cartBorrado = await cartsManager.deleteProduct(cartID);

   
    res.send({
        status: 'success',
        message: 'Carrito eliminado correctamente',
        payload: cartBorrado
    });
    } catch (error) {
        res.status(404).send({status: 'error', message: 'Producto no encontrado'});
    }
});

export default router;