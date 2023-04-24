import  userModel  from "./models/users.js";

export default class Users{
    constructor() {
        console.log('Users con DB en Mongo');
    }
    getByEmail = async (email) => {
        const user = await userModel.findOne({ email });
        return user;
    }

    save = async (user) => {
        const result = await userModel.create(user);
        return result;
    }
}
