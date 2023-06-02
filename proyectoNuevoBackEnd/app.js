import express from 'express';
import initializePassport from './src/config/passport.config.js';
import passport from 'passport';
import CartsRouter from './src/routes/products.router.js';
import ProductsRouter from './src/routes/products.router.js';
import UsersRouter from './src/routes/users.router.js';
import sessionsRouter from './src/routes/sessions.router.js';
import {
    addLogger
} from './utils/utils.js';
import {
    __dirname
} from "./utils/utils.js";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import cookieParser from 'cookie-parser';
import twilio from 'twilio';
import compression from 'express-compression';






const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const usersRouter = new UsersRouter();
// const sessionsRouter = new SessionsRouter();

const app = express();
const PORT = 8080;


initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(addLogger)
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

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/users', usersRouter.getRouter())
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/api/sessions', sessionsRouter);
// app.use('/api/tickets', ticketsRouter);
// app.use('/', viewsRouter);
// app.use(errorHandler);


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


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));