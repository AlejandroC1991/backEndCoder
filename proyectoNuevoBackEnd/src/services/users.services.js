import { USERSDAO } from "../dao/index.js";

const save = async(user) => {
    await USERSDAO.save(user);
    return user;
}

const getByEmail = async(email) => {
    const users = await USERSDAO.getByEmail(email);
    return users;
};

export {
    save,
    getByEmail
}