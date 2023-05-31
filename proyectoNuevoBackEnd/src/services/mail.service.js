import nodemailer from 'nodemailer';
import {
    __dirname
}
from '../../utils/utils.js';

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