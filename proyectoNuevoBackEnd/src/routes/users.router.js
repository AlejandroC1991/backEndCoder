import {
    Router
} from 'express';
import {
    getByEmail,
    save
} from '../controllers/users.controller.js';
import CustomError from '../../customErrors/service-errors/customError.js';
import EErrors from '../../customErrors/service-errors/enum.js';
import {
    generateUserErrorInfo
} from '../../customErrors/service-errors/info.js';

const router = Router();
const users = [];

router.get('/:email', getByEmail);
router.post('/', save);
router.post('/createUserWithMiddlewares', (req, res) => {
    const {
        first_name,
        last_name,
        email
    } = req.body;
    console.log(first_name, last_name, email)

    if (!first_name || !last_name || !email) {
        throw CustomError.createError({
            name: 'UserError',
            cause: generateUserErrorInfo({
                first_name,
                last_name,
                email
            }),
            message: 'Error tratando de crear un usuario',
            code: EErrors.INVALID_TYPES_ERROR
        });
    }

    const user = {
        first_name,
        last_name,
        email
    };

    users.push(user);
    res.send({
        status: "success",
        payload: user
    });
});

export default router;