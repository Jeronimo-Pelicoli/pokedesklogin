import express from 'express'
import routes from './routes'
import './database'

// setup
// const app = express()

// middlewares de configuração
// app.use(express.json())

// rotas
// app.use(routes)

class App {
    
    constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server