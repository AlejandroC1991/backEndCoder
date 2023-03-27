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

export default router;