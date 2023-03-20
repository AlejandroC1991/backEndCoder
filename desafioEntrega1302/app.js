import express from 'express';
import ProductManager from './src/ProductManager.js';
import CartManager from './src/CartManager.js';
import path from 'path';
import __dirname from './utils.js';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';
import handlebars from "express-handlebars";
import viewsRouter from './src/routes/views.router.js';
import {
    Server
} from 'socket.io';
// import fs from 'fs';

import {
    productModel
} from './src/dao/models/productsDB.js';
import {
    cartModel
} from './src/dao/models/cartsDB.js';
import mongoose from 'mongoose';



const app = express();


app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Creamos la instancia de la clase
const productManager = new ProductManager(path.join(__dirname, '.src/routes/productos.json'));
const cartManager = new CartManager(path.join(__dirname, '.src/routes/carritos.json'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/realTimeProducts', viewsRouter);



// CONECCION BASE DE DATOS MONGO DB
const environment = async () => {
    try {
        await mongoose.connect('mongodb+srv://alejandroceliberto:ZZswdPg7FUBHqLQ7@codercluster.mlsehvd.mongodb.net/?retryWrites=true&w=majority');
        const response = await productModel.create({
            "title": 'anteojo',
            "price": 200
        }, {
            "title": 'reloj automatico',
            "price": 1500
        }, {
            "title": 'cuchillo',
            "price": 100
        }, {
            "title": 'cuchara',
            "price": 30
        }, {
            "title": 'tenedor',
            "price": 40
        }, {
            "title": 'vaso',
            "price": 50
        }, {
            "title": 'copa',
            "price": 60
        }, {
            "title": 'botella',
            "price": 70
        }, {
            "title": 'mesa',
            "price": 800
        }, {
            "title": 'silla',
            "price": 200
        }, {
            "title": 'sillon',
            "price": 900
        }, {
            "title": 'notebook',
            "price": 2000
        }, {
            "title": 'celular',
            "price": 1000
        }, {
            "title": 'plato',
            "price": 20
        }, {
            "title": 'cocina',
            "price": 2100
        }, {
            "title": 'horno',
            "price": 2400
        }, {
            "title": 'microondas',
            "price": 2300
        }, {
            "title": 'heladera',
            "price": 3400
        }, {
            "title": 'mate',
            "price": 20
        }, {
            "title": 'termo',
            "price": 250
        }, {
            "title": 'bicicleta',
            "price": 500
        }, {
            "title": 'cama',
            "price": 150
        }, {
            "title": 'velador',
            "price": 300
        }, );

        // const response = await productModel.find({ title : 'cama' });
        // console.log(JSON.stringify(response, null, '\t'));



        res.send({
            status: 'success',
            payload: products,
            // totalPages: ,
            // prevPage: ,
            // nextPage: ,
            // page: ,
            // hasPrevPage: ,
            // hasNextPage: ,
            // prevLink: ,
            // nextLink: ,

        });
    } catch (error) {
        res.status(500).send({
            error
        });
    }
};

environment();

app.get('/products', async (req, res) => {
    const {
        title
    } = req.query;

    const productFilter = await productModel.find({
        title: title
    });
    console.log(JSON.stringify(productFilter, null, '\t'));
    res.send(productFilter);
})

app.listen(3030);



// const server = app.listen(8080, () => console.log("Escucha en puerto 8080"));
// const io = new Server(server);


// io.on('connection', async socket => {
//     console.log('cliente conectado')

//     const data = await fs.promises.readFile('./src/routes/productos.json', 'utf-8')
//     const products = JSON.parse(data)

//     io.emit('showProducts', products)

//     socket.on('spliced', async data => {
//         await productManager.deleteProduct(Number(data))
//         const products = await productManager.getProducts();
//         io.emit('showProducts', products);
//     })

//     socket.on('getForm', async data => {

//         const prods = await fs.promises.readFile('./src/routes/productos.json', 'utf-8')
//         const products = JSON.parse(prods)

//         if (products.length === 0) {
//             data.id = 1
//         } else {
//             data.id = products[products.length - 1].id + 1
//         }
//         const values = Object.values(data)
//         const valuesString = values.filter(e => typeof e == 'string')
//         const checkTrim = valuesString.findIndex(e => e.trim() === "")
//         const codeIndex = products.findIndex(e => e.code === data.code)

//         if (checkTrim !== -1) return socket.emit('checkTrim', 'Empty field')
//         if (codeIndex !== -1) return socket.emit('codeIndex', 'Code repited')

//         products.push(data)
//         await fs.promises.writeFile('./src/routes/productos.json', JSON.stringify(products, null, '\t'))

//         io.emit('showProducts', products)


//     })



// io.emit('prods', products)
// });