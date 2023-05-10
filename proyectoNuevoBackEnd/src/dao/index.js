import memoryCartsDao from './memoryManagers/carts.dao.js';
import memoryProductsDao from './memoryManagers/products.dao.js';
import memoryUsersDao from './memoryManagers/users.dao.js';
import memoryTicketsDao from './memoryManagers/tickets.dao.js';

import mongoCartsDao from './DBmanagers/cartsManager.js';
import mongoProductsDao from './DBmanagers/productsManager.js';
import mongoUsersDao from './DBmanagers/usersManager.js';
import mongoTicketsDao from './DBmanagers/ticketsManager.js';

import config from '../config/config.js';

export let PRODUCTSDAO,CARTSDAO, USERSDAO, TICKETSDAO; 

if (config.persistence=== 'MEMORY') {
  PRODUCTSDAO = new memoryProductsDao();
  CARTSDAO = new memoryCartsDao();
  USERSDAO = new memoryUsersDao();
  TICKETSDAO = new memoryTicketsDao();
} else if (config.persistence=== 'MONGO') {
  PRODUCTSDAO = new mongoProductsDao();
  CARTSDAO = new mongoCartsDao();
  USERSDAO = new mongoUsersDao();
  TICKETSDAO = new mongoTicketsDao();
} else {
   console.log("no definio ninguna persistencia valida")
};


