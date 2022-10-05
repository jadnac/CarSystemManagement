const nodemailer = require('nodemailer')

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,   
    auth: {
        user: process.env.GMAIL,
        pass: process.env.EMAIL_PASS
    }
})

module.exports = {
    smtpTransport
}