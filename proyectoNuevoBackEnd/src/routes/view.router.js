import { Router } from 'express';
import Carts from '../dao/managers/cartsManager.js';
import Products from '../dao/managers/productsManager.js';
import { productModel } from '../dao/models/products.js';


const productsManager = new Products();
const cartsManager = new Carts();

const router = Router();

// router.get('/products', async(req, res) => {
//     const products = await productsManager.getAll();
//     res.render('products', { products });
// });


router.get('/carts', async(req, res) => {
    const carts = await cartsManager.getAll();
    res.render('carts', { carts });
});


router.get('/products', async (req, res) => {
    const { page = 1 } = req.query;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productModel.paginate({}, { limit: 5, page, lean: true });

    const products = docs;

    res.render('products', {
        products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage
    })
});


const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/');
    next();
}

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
}

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});

router.get('/', privateAccess, (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
});



export default router;