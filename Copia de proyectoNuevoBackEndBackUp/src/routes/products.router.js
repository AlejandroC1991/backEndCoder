import { Router } from 'express';
import Products from '../dao/managers/productsManager.js';
import userModel from '../dao/models/users.js';

const productsManager = new Products();
const router = Router();

router.get('/', async (req, res) => {
    
    try {
        const products = await productsManager.getAll();
        res.send({
            status: 'success',
            payload: products
        });
    } catch (error) {
        res.status(500).send({error});
    }
});
router.get('/:code', async (req, res) => {
    
    try {
        const code = Number(req.params.code);
        const productsByCode = await productsManager.getProductByCode(code);
        if (!productsByCode) return res.send({message:"NO EXISTE ESE PRODUCTO"});
       
        res.send({
            status: 'success',
            payload: productsByCode
        });
    } catch (error) {
        res.status(500).send({message:"hay un error"});
    }
});

router.delete('/:code',async (req, res) => {
    try {
    const productCode = Number(req.params.code);
    

    const productoBorrado = await productsManager.deleteProduct(productCode);

   
    res.send({
        status: 'success',
        message: 'Producto eliminado correctamente',
        payload: productoBorrado
    });
    } catch (error) {
        res.status(404).send({status: 'error', message: 'Producto no encontrado'});
    }
});

router.post('/', async (req, res) => {
    const {title,description,code,price,status,stock,category} = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category) return res.status(400).send({
        status: 'error',
        error: 'Incomplete values'
    });

    try {
        const result = await productsManager.save({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            
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