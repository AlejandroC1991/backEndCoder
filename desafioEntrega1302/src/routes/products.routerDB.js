import {
    Router
} from 'express';
import Products from '../../dao/dbManagers/productsDB.js';

const products = new Products();
const router = Router();



router.get('/', async (req, res) => {
    try {
        const products = await productsManager.getAll();
        res.send({
            status: 'success',
            payload: products
        });
    } catch (error) {
        res.status(500).send({
            error
        });
    }
});

router.post('/', async (req, res) => {
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        id
    } = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category || !id) return res.status(400).send({
        status: 'error',
        error: 'Incomplete values'
    });

    try {
        const result = await usersManager.save({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            id
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
});

export default router;