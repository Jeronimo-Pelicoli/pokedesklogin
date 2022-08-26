import User from '../models/User'

class UserController {

    async show(req, res) {

        const id = req.user

        const user = await User.findById(id)

        if(!user) {
            return res.status(401).json({error: 'Only authenticated user can execute this actions'})
        }

        return res.json({ user: user.show()})
    }

    async store(req, res) {
        const { name, email, password } = req.body

        const userExists = await User.findOne({email})

        if(userExists) {
            return res.status(400).json({ error: 'Email already exists'})
        }

        const user = await User.create({
            name, email, password
        })

        return res.json({user: user.show()})
    }

    async update(req, res) {

        const id = req.user
        const user = await User.findById(id)
        const { name, email, password}

        if(!user) {
            return res.status(401).json({ eroor: 'Only authenticated user can execute this action'})
        }

        if(email && (email !== user.email)) {
            const userExists = await User.findOne({email})

            if(userExists) {
                return res.status(400).json({ error: 'Email already exists'})
            }
        }

        if(name) user.name = name
        if(email) user.email = email
        if(password) user.password = password

        await user.save()

        return res.json({user: user.show()})
    }

    async delete(req,res) {
        
        const id = req.user
        const user = await User.findById(id)

        if(!user) {
            return res.status(401).json({ error: 'Only authenticated user can execute this action'})
        }

        user.deleted = true
        await user.save()

        return res.status(204).send()
    }

}

export default new UserController()