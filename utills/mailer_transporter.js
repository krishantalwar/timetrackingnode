
const nodemailer = require("nodemailer");


// create reusable transporter object using the default SMTP transport
module.exports.mailerTransporter = () =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'cgt.pawan.test@gmail.com', // generated ethereal user
            pass: 'hgkoqxokxdxpiozm', // generated ethereal password
        },
    });
    return transporter;
}
