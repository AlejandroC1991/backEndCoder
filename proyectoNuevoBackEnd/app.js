import express from "express";
import __dirname from "./utils.js";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import cookieParser from 'cookie-parser';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';
import sessionsRouter from './src/routes/sessions.router.js';
import viewsRouter from './src/routes/view.router.js';
import initializePassport from './src/config/passport.config.js';
import passport from 'passport';



const app = express();

app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true
}));

app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


// PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://alejandroceliberto:ZZswdPg7FUBHqLQ7@codercluster.mlsehvd.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true },
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


app.listen(8080, () => console.log('Server running'));