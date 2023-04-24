import memoryCartsDao from './memoryManagers/carts.dao.js';
import memoryProductsDao from './memoryManagers/products.dao.js';
import memoryUsersDao from './memoryManagers/users.dao.js';

import mongoCartsDao from './DBmanagers/cartsManager.js';
import mongoProductsDao from './DBmanagers/productsManager.js';
import mongoUsersDao from './DBmanagers/usersManager.js';

import config from '../config/config.js';

const MemoryCartsDao = new memoryCartsDao();
const MemoryUsersDao = new memoryUsersDao();
const MemoryProductsDao = new memoryProductsDao();

const MongoCartsDao = new mongoCartsDao();
const MongoProductsDao = new mongoProductsDao();
const MongoUsersDao = new mongoUsersDao();

console.log(config.persistence)

export const PRODUCTSDAO = config.persistence === 'MEMORY' ? MemoryProductsDao : MongoProductsDao;
export const CARTSDAO = config.persistence === 'MEMORY' ? MemoryCartsDao : MongoCartsDao;
export const USERSDAO = config.persistence === 'MEMORY' ? MemoryUsersDao : MongoUsersDao;