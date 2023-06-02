import Router from './router.js';
import UsersManager from '../dao/DBmanagers/usersManager.js';
import {
    login,
    register,
} from '../controllers/users.controller.js';

const usersManager = new UsersManager();

export default class UsersRouter extends Router {
    init() {
        this.post('/login', ["PUBLIC"], null, login)
        this.post('/register', ["PUBLIC"], null, register)
    };
};