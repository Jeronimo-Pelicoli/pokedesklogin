import crypto from 'crypto'
import { addMinutes } from 'date-fns'
import User from '../models/User'
import Mail from '../helpers/Mail'
import mailConfig from '../config/mail'

class RecoveryController {
    async store(req, res) {
        const { email } = req.body

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({ error: 'user does not found'})
        }

        const token = crypto.randomBytes(8).toString('hex')
        const exp = addMinutes( new Date(), 5)

        user.token = token
        user.expiration = exp

        Mail.sendMail({
            from: mailConfig.from,
            to: user.email,
            subject: "Recuperação de senha",
            template: 'recovery',
            context: {
                token: user.token
            }
        })

        await user.save()

        return res.status(200).send()
    }
}

export default new RecoveryController()