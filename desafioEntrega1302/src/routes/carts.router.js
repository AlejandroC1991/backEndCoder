import { Router } from "express";
import { fileURLToPath } from 'url';
import path, { parse } from 'path';
import CartManager from "../CartManager.js";

const router = Router();

const carts = [];
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);


//Creamos la instancia de la clase
const cartManager = new CartManager(path.join(dirname, 'carritos.json'));

router.post('/', (req, res) => {
   
    const carrito = req.body;
    cartManager.addCart(carrito);
    res.send({status: "success",message: "producto creado"});
    console.log(carts);

});

router.get('/:cid', async (req, res) => {
    const carts = await cartManager.getProducts();
    
    res.send(carts);
});

router.post('/:cid/product/:pid', async (req, res) => {
    
    var cid = req.params['cid'];
    var pid = req.params['pid'];

    //verificar los rangos y tipos de parametros

    if( isNaN(cid) || isNaN(pid)){
        res.send({status: "error",message: ":("});
        return;
    }
    
    //Agregar al carrito el producto
            //Existe el carrito
                //Agregar producto si producto existe sumar cantidad
            //No existe el carrito crear carrito
                //Informar que carrito no existe

    let ret = await cartManager.addProductToCart(Number(pid), Number(cid));
    
   if( ret == null ){
       res.send({status: "error",message: "message ..."});
       
    }else{
        res.send({status: "success",message: "OK"});
    }
});

export default router;

