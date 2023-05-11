import {
    save as saveUsersService,
    getByEmail as getByEmailUsersService
} from '../services/users.services.js';

const getByEmail = async (req, res) => {
    try {
        const email = String(req.params.email);
        const userByEmail = await getByEmailUsersService(email);
        if (!userByEmail) return res.send({
            message: "NO EXISTE ESE EMAIL"
        });
        res.json({
            
            status: 'success',
            payload: userByEmail
        });
    } catch (error) {
        res.status(500).send({
            message: ("hay un error email")
        })}
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