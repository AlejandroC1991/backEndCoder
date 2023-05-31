import mongoose from "mongoose";
import config from "../config/config.js";

export let Users;
export let Products;
export let Carts;
export let Tickets;

const persistence = config.persistence;

switch (persistence) {
    case "MONGO":
        console.log("Usando DAO de mongo");
        await mongoose.connect(config.mongoUrl);
        const {
            default: UsersMongo
        } = await import('./DBmanagers/usersManager.js');
        const {
            default: ProductsMongo
        } = await import('./DBmanagers/productsManager.js');
        const {
            default: CartsMongo
        } = await import('./DBmanagers/cartsManager.js');
        const {
            default: TicketsMongo
        } = await import('./DBmanagers/ticketsManager.js');
        Users = UsersMongo;
        Products = ProductsMongo;
        Carts = CartsMongo;
        Tickets = TicketsMongo;
        break;
    case "MEMORY":
        console.log("Usando DAO de memoria");
        const {
            default: UsersMemory
        } = await import('../dao/memoryManagers/users.dao.js');
        const {
            default: ProductsMemory
        } = await import('../dao/memoryManagers/products.dao.js');
        const {
            default: CartsMemory
        } = await import('../dao/memoryManagers/carts.dao.js');
        const {
            default: TicketsMemory
        } = await import('../dao/memoryManagers/tickets.dao.js');
        Users = UsersMemory;
        Products = ProductsMemory;
        Carts = CartsMemory;
        Tickets = TicketsMemory;
        break;
}