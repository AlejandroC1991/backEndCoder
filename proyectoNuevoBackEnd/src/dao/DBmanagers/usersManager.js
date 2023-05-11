import  userModel  from "./models/users.js";

export default class Users{
    constructor() {
        console.log('Users con DB en Mongo');
    }
    getByEmail = async (email) => {  
        
        return await userModel.findOne( email );
    }

    save = async (user) => {
        return await userModel.create(user);
    }
}
