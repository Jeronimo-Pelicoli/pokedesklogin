import Category from '../models/Category'

class CategoryController {

    async index(req, res) {
        const categories = await Category.find({})

        res.json(categories)
    }

    async store(req, res) {
        const { name } = req.body

        const categoryExists = await Category.findOne({name})
        if(categoryExists) {
            return res.status(400).json({error: 'Category already exists'})
        }

        const category = await Category.create({
            name 
        })

        return res.json(category)
    }

    async update(req, res) {
        const { id } = req.params
        const { name } = req.body

        const category = await Category.findById(id)

        if(!category) {
            return res.status(400).json({error: 'Category does not found'})
        }
        if(name && (name !== category.name)) {
            const categoryExists = await Category.findOne({name})
            if(categoryExists) {
                return res.status(400).json({error: 'Category already exists'})
            }
        }
        if(!name) {
            return res.status(400).json({error: 'Category required'})
        }

        category.name = name
        category.save()

        res.json(category)
    }

    async delete(req, res) {
        const { id } = req.params

        const category = await Category.findById(id)

        if(!category) {
            return res.status(400).json({error: 'Category does not found'})
        }

        category.remove()
        res.status(204).send()
    }
}

export default new CategoryController()