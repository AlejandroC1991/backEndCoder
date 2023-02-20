import { Router } from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import ProductManager from "../ProductManager.js";

const router = Router();

const products = [];
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);


//Creamos la instancia de la clase
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const {limit} = req.query;

    if (limit) {
        products.splice(limit, )
    }
    res.send(products);
});


router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const products = await productManager.getProductById(id);
    res.send(products);
});


router.post('/', (req, res) => {
    const product = req.body;
    productManager.addProduct(product);
    res.send({status: "success",message: "producto creado"});
    console.log(products);
    
});



router.put('/:id', async(req, res) => {
    const product = req.body;
    const productId = Number(req.params.id);


    const newProduct = { id: productId, ...product }


    const index = await productManager.updateProduct(newProduct);
  
    if (index != -1) {
        products[index] = newProduct;
        res.send({status: 'sucess', message: 'Producto actualizado'});
    } else {
        res.status(404).send({status: 'error', message: 'Producto no encontrado'});
    }
});

router.delete('/:id',async (req, res) => {
    const productId = Number(req.params.id);

    const index = await productManager.deleteProduct(productId);

    if (index != -1) {
        products.splice(index, 1);
        res.send({status: 'sucess', message: 'Producto Eliminado'});
    } else {
        res.status(404).send({status: 'error', message: 'Producto no encontrado'});
    }
});




//ULTIMO EJERCICIO
router.post('/', (req, res) => {
    const product = req.body;
    products.push(product);
    res.send({status: "success"});
});

router.get('/', (req, res) => {
    res.send({products});
});

//
export default router;