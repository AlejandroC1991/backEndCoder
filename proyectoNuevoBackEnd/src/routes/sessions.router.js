import {
    Router
} from 'express';
import {
    usersModel
} from '../dao/DBmanagers/models/users.js';

import {
    hashData,
    compareHashedData,
} from '../../utils/utils.js'
import passport from 'passport';

const router = Router();

router.post('/register', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        age,
        password
    } = req.body;

    try {
        const exists = await usersModel.findOne({
            email
        });
        if (exists) return res.status(400).send({
            status: 'error',
            error: 'user already exists'
        });

        const user = {
            first_name,
            last_name,
            email,
            age,
            password: hashData(password)
        };

        await usersModel.create(user);

        res.send({
            status: 'success',
            message: 'user registered'
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
});

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) return res.status(400)
        .send({
            status: 'error',
            message: 'Incomplete values'
        });

    try {
        const user = await usersModel.findOne({
            email
        });


        if (!user) return res.status(404).send({
            status: 'error',
            message: 'User not found'
        });

        if (!compareHashedData(user, password)) return res.status(401).send({
            status: 'error',
            message: 'Invalid credentials'
        });

        delete user.password;

        req.session.user = user;

        res.send({
            status: 'success',
            message: 'login success'
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
});

router.post('/reset', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) return res.status(400)
        .send({
            status: 'error',
            message: 'Incomplete values'
        });

    try {
        const user = await usersModel.findOne({
            email
        });

        if (!user) return res.status(404).send({
            status: 'error',
            message: 'User not found'
        });

        user.password = createHash(password);

        await usersModel.updateOne({
            email
        }, user);

        res.send({
            status: 'success',
            message: 'reset success'
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
});




router.get('/github',
    passport.authenticate('github', {
        scope: ['user:email']
    }),
    async (req, res) => {
        res.send({
            status: 'sucess',
            message: 'user registered'
        });
    });

router.get('/github-callback', passport.authenticate('github', {
    failureRedirect: '/login'
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
})
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({
            status: 'error',
            error: 'couldnt logout'
        });
        res.redirect('/');
    })
});

export default router;