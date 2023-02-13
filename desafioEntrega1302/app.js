import express from 'express';
import ProductManager from '../desafioEntrega1302/src/ProductManager.js';
import CartManager from '../desafioEntrega1302/src/CartManager.js';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';


const app = express();


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);


//Creamos la instancia de la clase
const productManager = new ProductManager(path.join(dirname, 'productos.json'));
const cartManager = new CartManager(path.join(dirname, 'carritos.json'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Puse el puerto 6060 porque me quedaba prendido el 8080 y me daba error, no supe como cancelarlo//
app.listen(6060, () => console.log("Escucha en puerto 6060"));

