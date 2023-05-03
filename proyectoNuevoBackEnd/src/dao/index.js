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

export let PRODUCTSDAO; 

if (config.persistence=== 'MEMORY') {
     MemoryProductsDao;
} else if (config.persistence=== 'MONGO') {
     MongoProductsDao;

} else {
   console.log("no definio ninguna persistencia valida")
};


export let CARTSDAO;
 
 if (config.persistence=== 'MEMORY') {
    MemoryCartsDao;
} else if (config.persistence=== 'MONGO') {
    MongoCartsDao;

} else {
  console.log("no definio ninguna persistencia valida")
}


export let USERSDAO;
 
 if (config.persistence=== 'MEMORY') {
    MemoryUsersDao;
} else if (config.persistence=== 'MONGO') {
    MongoUsersDao;

} else {
  console.log("no definio ninguna persistencia valida")
}