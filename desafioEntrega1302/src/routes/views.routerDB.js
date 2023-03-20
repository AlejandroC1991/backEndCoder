import { Router } from 'express';
import Products from '../../dao/dbManagers/productsDB.js';
import Carts from '../../dao/dbManagers/cartsDB.js';

const productsManager = new Products();
const Carts = new Carts();

const router = Router();

router.get('/products', async(req, res) => {
    const products = await productsManager.getAll();
    res.render('products', { products });
});


router.get('/carts', async(req, res) => {
    const carts = await cartsManager.getAll();
    res.render('carts', { carts });
});

export default router;