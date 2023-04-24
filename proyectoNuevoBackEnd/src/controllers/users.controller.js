import {
    save as saveUsersService,
    getByEmail as getByEmailUsersService
} from '../services/users.services.js';

const getByEmail = async (req, res) => {
    try {
        const users = await getByEmailUsersService(email);
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

const save = async (req, res) => {
    try {
        const user = req.body;
        await saveUsersService(user);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    getByEmail,
    save
}