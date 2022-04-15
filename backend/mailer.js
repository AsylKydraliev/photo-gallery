require('dotenv').config();
const nodemailer = require('nodemailer');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 6);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Код для подтверждения пароля',
    text: 'Введите данный код для восстановления вашего пароля - ' + nanoid(),
};

transporter.sendMail(mailOptions);