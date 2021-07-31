const nodemailer = require('nodemailer')
require('dotenv').config()
var smtpTransport = require('nodemailer-smtp-transport');

async function send() {
let testAccount = await nodemailer.createTestAccount();
let transporter = nodemailer.createTransport(smtpTransport({    
    service: 'gmail',
    host: 'smtp.gmail.com', 
    auth: {        
         user: process.env.USERNAME,        
         pass: process.env.PASSWORD    
    }
}));

    var info = await transporter.sendMail({
        from: "developspammail@gmail.com",
        to: 'gameoftoast.brot@gmail.com',
        subject:"testtesttesttest",
        text: "plzwork",
    })

    console.log(nodemailer.getTestMessageUrl(info))
}

send()