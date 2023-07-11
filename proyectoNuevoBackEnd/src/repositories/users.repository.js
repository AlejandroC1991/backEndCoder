import UserDao from '../dao/DBmanagers/usersManager.js';
export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
        this.dao = new UserDao();
    }

    getByEmail = async (email) => {
        const result = await this.dao.getByEmail(email);
        return result;
    }

    saveUser = async (user) => {
        const result = await this.dao.saveUser(user);
        return result;
    }
}