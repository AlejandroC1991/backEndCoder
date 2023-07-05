import mockingoose from "mockingoose";
import {
    cartModel
} from '../../src/dao/DBmanagers/models/carts.js';
import
Carts
from '../../src/dao/DBmanagers/cartsManager.js';
import chai from 'chai';

const expect = chai.expect;


describe('Carts DAO', () => {
    it('Deberia traer todos mis carritos', async () => {
        const cartsDao = new Carts();
        mockingoose(cartModel).toReturn([{
            idCarrito: 1,
            products: []
        }], 'find');
        const result = await cartsDao.getAll();
        expect(Array.isArray(result)).to.be.eqls(true);
        expect(result[0].idCarrito).to.be.eqls(1);
        expect(result[0].products).to.be.eqls([]);
    });

    it('Deberia retornar un carrito por ID', async () => {
        const cartsDao = new Carts();
        mockingoose(cartModel).toReturn([{
            idCarrito: 2,
            products: []
        }], 'findOne');
        const result = await cartsDao.getCartByID(123);
        expect(result[0].idCarrito).to.be.eqls(2);
        expect(result[0].products).to.be.eqls([]);
    });
    it('Deberia crear un carrito', async () => {
        const cartsDao = new Carts();
        const carrito = {
            idCarrito: 123,
            products: []
        };

        mockingoose(cartModel).toReturn({
            id: "asdasd123",
            idCarrito: 123,
            products: []
        }, 'create');

        const result = await cartsDao.save(carrito);
        expect(result.idCarrito).to.be.eql(123);
        expect(result.products).to.be.eql([]);
    });
    it('Deberia actualizar un carrito', async () => {
        const cartsDao = new Carts();
        const carritoActualizado = {
            idCarrito: 345,
            products: []
        };
        const carrito = {
            idCarrito: 123,
            products: []
        };

        mockingoose(cartModel).toReturn(carritoActualizado, 'updateOne');

        const result = await cartsDao.update(carrito, carritoActualizado);
        expect(result).to.be.eql(carritoActualizado);
    });

});