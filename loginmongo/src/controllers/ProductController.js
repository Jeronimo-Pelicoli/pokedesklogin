import Category from '../models/Category';
import Product from '../models/Product'

class ProductController {

    async index(req, res){

        const products = await Product.find().populate('category');

        return res.json(products)
    }

    async store(req, res) {
        const { name, description, price, category } = req.body

        const categoryExists = await Category.findById(category)

        if(!categoryExists) {
            return res.status(400).json({ error: 'category does not exists'})
        }

        const productExists = await Product.findOne({name})
        if(productExists) {
            return res.status(400).json({ error: 'product already exists'})
        }

        const product = await Product.create({
            name, description, price, category
        })

        return res. json(product)
    }

    async update(req, res) {
        
        const { id } = req.params
        const { name, description, price, category } = req.body

        const categoryExists = await Category.findById(category)

        if(!categoryExists) {
            return res.status(400).json({ error: 'category does not exists'})
        }

        const product = await Product.findById(id)
        if(!product) {
            return res.status(400).json({ error: 'product does not found'})
        }

        if(name && (name !== product.name)) {
            const productExists = await Product.findOne({name})
            if(!productExists) {
                return res.status(400).json({ error: 'product already exists'})
            }
        }

        product.name = name
        product.description = description
        product.price = price
        product.category = category
        await product.save()

        return res. json(product)

    }

    async delete(req, res) {
        
        const { id } = req.params

        const product = await Product.findById(id)
        if(!product) {
            return res.status(400).json({ error: 'product does not found'})
        }

        product.remove()

        return res.status(204).send()
        
    }

}

export default new ProductController()