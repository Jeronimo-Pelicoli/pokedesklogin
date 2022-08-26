import { verify } from "jsonwebtoken"
import { secret } from "../config/jwt"
import User from "../models/User"

export default async function checkCredential(req, res, next) {
    
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({error: 'Token is missing'})
    }

    const [ type, token ] = authHeader.split(' ')



    try {
        const decoded = await verify(token, secret)

        const id = decoded.sub

        const userAlreadyDeleted = User.findById(id)

        if(userAlreadyDeleted.deleted === true) {
            return res.status(401).json({error: 'Disabled user'})
        }

        req.user = id

        return next()

    } catch (error) {
        return res.status(401).json({ error: 'Invalid web token'})
    }
}