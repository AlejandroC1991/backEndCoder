import express from 'express';
import ProductManager from './src/ProductManager.js';
import CartManager from './src/CartManager.js';
import path from 'path';
import __dirname from './utils.js';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';
import handlebars from "express-handlebars";
import viewsRouter from './src/routes/views.router.js';
import { Server } from 'socket.io';
import fs from 'fs';



const app = express();


app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Creamos la instancia de la clase
const productManager = new ProductManager(path.join(__dirname, 'productos.json'));
const cartManager = new CartManager(path.join(__dirname, 'carritos.json'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/realTimeProducts', viewsRouter);




const server = app.listen(8080, () => console.log("Escucha en puerto 8080"));
const io = new Server(server);


io.on('connection', async socket => {
    console.log('cliente conectado')
    
    const data = await fs.promises.readFile('./src/routes/products.json', 'utf-8')
    const products = JSON.parse(data)
    
    io.emit('showProducts', products)

    socket.on('spliced', async data => {
        await productManager.deleteProduct(Number(data))
        const products = await productManager.getProducts();
        io.emit('showProducts', products);
    })

    socket.on('getForm', async data => {

        const prods = await fs.promises.readFile('./src/routes/products.json', 'utf-8')
        const products = JSON.parse(prods)

        if (products.length === 0) {
            data.id = 1
        } else {
            data.id = products[products.length - 1].id + 1
        }
        const values = Object.values(data)
        const valuesString = values.filter(e => typeof e == 'string')
        const checkTrim = valuesString.findIndex(e => e.trim() === "")
        const codeIndex = products.findIndex(e => e.code === data.code)

        if (checkTrim !== -1) return socket.emit('checkTrim', 'Empty field')
        if (codeIndex !== -1) return socket.emit('codeIndex', 'Code repited')

        products.push(data)
        await fs.promises.writeFile('./src/routes/products.json', JSON.stringify(products, null, '\t'))

        io.emit('showProducts', products)


    })
    


io.emit('prods', products)
});