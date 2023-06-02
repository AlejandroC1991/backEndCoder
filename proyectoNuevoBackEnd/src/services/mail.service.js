import nodemailer from 'nodemailer';
import {
    __dirname
}
from '../../utils/utils.js';
import createTransport from 'nodemailer';

//EMAIL NODEMAILER
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'alejandro.celiberto@gmail.com',
        pass: 'jhygjjtotgxhzlbm'
    }
});

export const sendEmail = async (email) => {
    await transporter.sendMail({
        from: 'alejandro.celiberto@gmail.com',
        to: 'alejandro.celiberto@findholding.com',
        subject: 'CORREO DE PRUEBA',
        html: `<div><h1>Hola, esto es una prueba de envio de correo con una imagen adjunta</h1>
        <img src="cid:find"/></div>`,
        attachments: [{
            filename: 'find.png',
            path: `${__dirname}/find.png`,
            cid: 'find'
        }]
    });
}

export async function sendMail(data) {

    let transporter = createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USERNAME, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"${data.fromName}" <${data.fromEmail}>`, // sender address
        to: `${data.toEmail.join(",")}`, // list of receivers
        subject: data.subject, // Subject line       
        html: data.body, // html body
    });

    return info
}