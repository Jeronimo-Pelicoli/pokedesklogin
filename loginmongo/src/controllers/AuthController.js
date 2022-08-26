import bcryptjs from 'bcryptjs'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import { secrete, expiresIn } from '../config/jwt'

class AuthController {

    async store(req, res) {
        
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({ error: 'email or password incorrect'})
        }

        if(user.deleted === true) {
            return res.status(401).json({error: 'Disabled user'})
        }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if(!checkPassword) {
            return res.status(400).json({ error: 'email or password incorrect'})
        }

        const token = jwt.sign({}, secrete, {
            subject: String(user._id),
            expiresIn
        })

        res.json({user: user.show(), token})
    }
}

export default new AuthController()