import express from "express";
import {
    __dirname
} from "./utils/utils.js";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import cookieParser from 'cookie-parser';
import initializePassport from './src/config/passport.config.js';
import passport from 'passport';

import sessionsRouter from './src/routes/sessions.router.js';
import viewsRouter from './src/routes/view.router.js';
import usersRouter from './src/routes/users.router.js';
import cartsRouter from './src/routes/carts.router.js';
import productsRouter from './src/routes/products.router.js';
import ticketsRouter from './src/routes/tickets.router.js';

import twilio from 'twilio';
import compression from 'express-compression';
import errorHandler from './customErrors/middlewares-errors/index.js';
import {
    addLogger
} from './utils/logger.js';
import UsersRouter from './src/routes/users.router.js';



const app = express();

app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true
}));

const UsuariosRouter = new UsersRouter();

app.use('/api/users', UsuariosRouter.getRouter())
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/', viewsRouter);
app.use(errorHandler);

// PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://alejandroceliberto:ZZswdPg7FUBHqLQ7@codercluster.mlsehvd.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true
        },
        ttl: 3600
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}));


(async () => {
    try {
        await mongoose.connect('mongodb+srv://alejandroceliberto:ZZswdPg7FUBHqLQ7@codercluster.mlsehvd.mongodb.net/?retryWrites=true&w=majority');

    } catch (error) {
        console.error('error');
    }
})();



//SMS TWILIO

const TWILIO_ACCOUNT_SID = 'AC0477a618bec597d3c27cbc5ff1e181a9';
const TWILIO_AUTH_TOKEN = '7f02dee778f1c33237cdee7fad496825';
const TWILIO_PHONE_NUMBER = '+13204338456';

const client = twilio(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER
);

app.get('/sms', async (req, res) => {
    await client.messages.create({
        from: TWILIO_PHONE_NUMBER,
        to: '+541122563087',
        body: "MENSAJE DE PRUEBA"
    });

    res.send('SMS sent');
});

app.get('/custom-sms', async (req, res) => {
    const {
        name,
        product
    } = req.query;
    await client.messages.create({
        from: TWILIO_PHONE_NUMBER,
        to: '+541122563087',
        body: `Hola ${name} gracias por tu compra. Tu producto es ${product}`
    });

    res.send('SMS sent');
});

app.get('/whatsapp', async (req, res) => {
    let {
        name,
        product
    } = req.query;
    await client.messages.create({
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491122563087',
        body: `Hola ${name} gracias por tu compra. Tu producto es ${product}`

    });
    console.log("el mensaje se envio");

    res.send('Whatsapp sent');
})

//COMPRESSION
app.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}))




//LOGGER

app.use(addLogger);

app.get('/loggers', (req, res) => {
    // Loguear a nivel consola
    // req.logger.error('Prueba error');
    // req.logger.warn('Prueba warn');
    // req.logger.info('Prueba info');
    // req.logger.debug('Prueba debug');
    // req.logger.silly('Prueba silly');

    //Mensajes niveles custom
    req.logger.fatal('Prueba fatal');
    req.logger.error('Prueba error');
    req.logger.warning('Prueba warning');
    req.logger.info('Prueba info');
    req.logger.debug('Prueba debug');

    res.send({
        message: 'Prueba logger'
    });
});


app.listen(8080, () => console.log('Server running'));