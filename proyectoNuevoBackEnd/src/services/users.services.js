import { USERSDAO } from "../dao/index.js";

const save = async(user) => {
    return await USERSDAO.save(user);
}

const getByEmail = async(email) => {
    return await USERSDAO.getByEmail({email});
};

export {
    save,
    getByEmail
}