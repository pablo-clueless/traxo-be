import nodemailerhbs from 'nodemailer-express-handlebars'
import exphbs from 'express-handlebars'
import nodemailer, { SendMailOptions } from 'nodemailer'
import path from 'path'
import fs from 'fs'

// import { MailOptions} from '../interfaces'

const USER = <string> process.env.SMTP_USER
const PASS = <string> process.env.SMTP_PASS
const SENDER = <string> process.env.SENDER

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
})

const transport = nodemailer.createTransport({
    host: '',
    port: 587,
    secure: false,
    auth: {
        user: '',
        pass: '',
    },
})

transport.use('compile', nodemailerhbs({
    viewEngine: hbs,
    viewPath: '',
}))

export const sendOTP = async(mailOptions: SendMailOptions) => {
    try {
        transport.sendMail({
            from: SENDER,
            to: mailOptions.to,
            subject: mailOptions.subject,
            // template: 'welocme-email',
            // context: mailOptions.context
        }, (error, info) => {

        })
    } catch (error) {}
}