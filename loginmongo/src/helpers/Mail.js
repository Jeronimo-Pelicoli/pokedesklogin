import nodemailer from 'nodemailer'
import nodemailerhbs from 'nodemailer-express-handlebars'
import { host, port, secure, auth } from '../config/mail'
import hbsConfig from '../config/hbs'

class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host, port, secure, auth
        })

        this.configureTemplates()
    }

    configureTemplates() {
        this.transporter.use(
            'compile',
            nodemailerhbs(hbsConfig)
        )
    }

    sendMail(data) {
        this.transporter.sendMail(data)
    }
}

export default new Mail()