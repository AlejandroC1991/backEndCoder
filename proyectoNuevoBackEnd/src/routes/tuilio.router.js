import express from 'express';
import twilio from 'twilio';

const router = express.Router();

const TWILIO_ACCOUNT_SID = 'AC0477a618bec597d3c27cbc5ff1e181a9';
const TWILIO_AUTH_TOKEN = '7f02dee778f1c33237cdee7fad496825';
const TWILIO_PHONE_NUMBER = '+13204338456';

const client = twilio(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER
);

router.get('/sms', async (req, res) => {
    await client.messages.create({
        from: TWILIO_PHONE_NUMBER,
        to: '+541122563087',
        body: 'MENSAJE DE PRUEBA'
    });

    res.send('SMS sent');
});

router.get('/custom-sms', async (req, res) => {
    const {
        name,
        product
    } = req.query;
    await client.messages.create({
        from: TWILIO_PHONE_NUMBER,
        to: '+541122563087',
        body: `Hola ${name} gracias por tu compra. Tu producto es ${product}`
    });

    res.send('SMS sent');
});

router.get('/whatsapp', async (req, res) => {
    const {
        name,
        product
    } = req.query;
    await client.messages.create({
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491122563087',
        body: `Hola ${name} gracias por tu compra. Tu producto es ${product}`
    });

    console.log('El mensaje se envió');

    res.send('WhatsApp sent');
});

export default router;