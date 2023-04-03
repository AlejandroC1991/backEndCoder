import { Router } from 'express';
import Carts from '../dao/managers/cartsManager.js';
import Products from '../dao/managers/productsManager.js';
import { productModel } from '../dao/models/products.js';
import { cartModel } from '../dao/models/carts.js';
import userModel from '../dao/models/users.js';



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
    const { page = 1   } = req.query;
    const { docs : products, hasPrevPage, hasNextPage, nextPage, prevPage } = await productModel.paginate({}, { limit: 5, page, lean: true });
    const { first_name, email } = req.session.user;
    const user = {first_name, email}

    res.render('products', {
        products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
        user
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


router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
});

router.get('/login', (req, res) => {
    res.render('login');
});


router.get('/reset', publicAccess, (req, res) => {
    res.render('reset');
});

router.get('/', privateAccess, (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
});



export default router;