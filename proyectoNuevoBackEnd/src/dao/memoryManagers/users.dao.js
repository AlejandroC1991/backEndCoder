export default class UsersDao{
    constructor() {
        this.data = [];
    }
    getByEmail = async (email) => {
        return this.data(email);
    }

    save = async (user) => {
        this.data.push(user);
        return user;
    }
}
