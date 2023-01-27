const nodeMailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config({path: '../config/config.env'});

const mailSender = async(option)=>{
    const transporter = nodeMailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD,
            secure: false
        }
    });
    const mailOption = {
        from: process.env.EMAIL,
        to: option.email,
        subject:  option.subject,
        text: option.message
    };
    await transporter.sendMail(mailOption)
};

module.exports = mailSender;