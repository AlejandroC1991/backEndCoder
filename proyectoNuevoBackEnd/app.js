import express from 'express';
import initializePassport from './src/config/passport.config.js';
import passport from 'passport';
import CartsRouter from './src/routes/carts.router.js';
import ProductsRouter from './src/routes/products.router.js';
import UsersRouter from './src/routes/users.router.js';
import sessionsRouter from './src/routes/sessions.router.js';
import {
    addLogger,
    __dirname
} from './utils/utils.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import compression from 'express-compression';
import ResetPasswordRouter from './src/routes/reset-password.router.js';
import {
    spects
} from './src/docs/config.js';
import swaggerUiExpress from 'swagger-ui-express';
import __mainDirname from './utils/index.js';




const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const usersRouter = new UsersRouter();

const app = express();
const PORT = 8080;

initializePassport();

app.use(addLogger);
app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/views`);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://alejandroceliberto:ZZswdPg7FUBHqLQ7@codercluster.mlsehvd.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true
        },
        ttl: 3600
    }),
    secret: 'secretCode',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(spects));
app.use('/api/users', usersRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/api/sessions', sessionsRouter);
app.use('/api/reset-password', ResetPasswordRouter);


(async () => {
    try {
        await mongoose.connect('mongodb+srv://alejandroceliberto:ZZswdPg7FUBHqLQ7@codercluster.mlsehvd.mongodb.net/?retryWrites=true&w=majority');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
})();

//COMPRESSION
app.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}))


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));