import UsersRepository from "../../repositories/users.repository.js";
import {
    IncorrectLoginCredentials,
    UserNotFound
} from "../../utils/customExceptions.js";
import {
    loginNotification
} from "../../utils/customHtml.js";
import {
    sendEmail
} from "../services/mail.service.js";
import {
    Users
} from "../dao/factory.js";
import {
    hashData,
    compareHashedData,
    generateToken,
} from "../../utils/utils.js";

const users = new Users();
const usersRepository = new UsersRepository(users);

export const getByEmailLogin = async (email) => {
    const user = await usersRepository.getByEmail(email);
    console.log(user + "aca esta el usuario")
    if (!user) {
        throw new UserNotFound('El usuario no existe');
    }
    return user;
}
export const login = async (password, user) => {
    const comparePassword = await compareHashedData(password, user.password);
    if (!comparePassword) {
        throw new IncorrectLoginCredentials('Incorrect credentials')
    }

    const accessToken = generateToken(user);

    const email = {
        to: user.email,
        subject: 'Intento de login',
        html: loginNotification
    }
    await sendEmail(email);

    return accessToken;
}

export const register = async (user) => {
    const hashPassword = await hashData(user.password);
    user.password = hashPassword;
    const newUserDB = await usersRepository.saveUser(user);
    return newUserDB;
}

export const getByEmailRegister = async (email) => {
    const user = await usersRepository.getByEmail(email);
    return user;
}