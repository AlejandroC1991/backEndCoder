import {
    hash
} from 'bcrypt';

import UsersRepository from '../../repositories/users.repository.js';
import {
    sendMail
} from './mail.service.js';
import {
    readFileSync
} from "fs";
import {
    resolve
} from "path";
// import {
//     compile
// } from "handlebars";
import ResetPassword from '../models/reset-password.models.js';


const usersRepository = new UsersRepository();
// usersRepository.getByEmail();
// usersRepository.saveUser();



export const ForgotPassword = async (email) => {

    let userExist = await usersRepository.getByEmail(email)
    if (userExist.length > 0) {
        let user = userExist[0];
        const userEmail = user.email;
        console.log(user)
        try {

            // creating data for sending mail
            const data = {
                "fromEmail": process.env.APP_FROM_EMAIL,
                "fromName": process.env.APP_FROM_NAME,
                "subject": "Reset Password",
                "body": ``,
                "toEmail": [user.email]
            }
            console.log(data)

            //initializing ResetPassword() model for storing user_id and token in the database.
            let resetPassword = new ResetPassword();

            // creating token 
            let token = await hash(user.email, 1);

            // creating base64 encoded token because hash can contain "/" symbol which will give problem if passed as url param.
            token = Buffer.from(token).toString('base64')

            // storing user_id and token in `reset_password` table
            let result = resetPassword.create([{
                "user_id": user.id,
                "token": token
            }])

            // creating redirect url for navigating user to fill new password
            let actionUrl = `http://${process.env.FRONTEND_URL}/reset/${token}`;
            console.log(actionUrl)

            // reading template file for sending in mail
            const templateStr = readFileSync(resolve(__dirname, '../views/mails/resetPassword.hbs')).toString('utf8')
            const template = compile(templateStr, {
                noEscape: true
            })

            // parsing template file for changing variables with values

            const html = template({
                "name": `${user.firstname} ${user.lastname}`,
                "action_url": actionUrl

            })
            data.body = html;

            // sending mail using nodemailer library
            let resultMail = await sendMail(data);
            console.log(resultMail)

        } catch (error) {
            console.log(error);
            throw new Error("Something wrong in sending mail");
        }

    } else {
        throw new Error("User not found with that email")
    }

}