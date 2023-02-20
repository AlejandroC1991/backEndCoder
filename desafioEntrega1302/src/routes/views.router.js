import { Router } from "express";
import fs from 'fs'
import path from 'path';
import __dirname from '../../utils.js';


const router = Router();


// router.get('/', async(req,res) =>{
// let data=fs.readFileSync(path.join(__dirname, '/src/routes/productos.json'), 'utf8');
// let words=JSON.parse(data);
//     res.render('home', {words});
// });



router.get('/', async (req, res) => {
    let data=fs.readFileSync(path.join(__dirname, '/src/routes/productos.json'), 'utf8');
    let products = JSON.parse(data)

    res.render('realTimeProducts', {products});
});

router.delete('/', async (req, res) => {
    try {

        const productId = Number(req.params.pid)
        const index = products.findIndex(p => p.id == productId)

        if (index !== -1) {
            products.splice(index, 1)
            await fs.promises.writeFile('./src/routes/products.json', JSON.stringify(products, null, '\t'))
                res.render('realTimeProducts', {products});

        } else {
            res.status(404).send({
                status: 'error',
                message: 'Product not found'
            })
        }
    } catch (error) {
        console.error(error)
    }
})



export default router;