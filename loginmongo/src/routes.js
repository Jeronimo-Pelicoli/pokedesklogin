import { Router } from 'express'
import AuthController from './controllers/AuthController'
import CategoryController from './controllers/CategoryController'
import ProductController from './controllers/ProductController'
import RecoveryController from './controllers/RecoveryController'
import UserController from './controllers/UserController'
import checkCredential from './middlewares/checkCredential'

const routes = Router()

routes.get('/categories', CategoryController.index)
routes.post('/categories', CategoryController.store)
routes.put('/categories/:id', CategoryController.update)
routes.delete('/categories/:id', CategoryController.delete)

routes.get('/products', ProductController.index)
routes.post('/products', ProductController.store)
routes.put('/products/:id', ProductController.update)
routes.delete('/products/:id', ProductController.delete)

routes.post('/auth', AuthController.store)
routes.post('/users', UserController.store)
routes.get('/users', checkCredential, UserController.show)
routes.put('/users', checkCredential, UserController.update)
routes.delete('/users', checkCredential, UserController.delete)

routes.post('/recovery', RecoveryController.store)

export default routes