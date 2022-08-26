import mongoose from 'mongoose'

class Database {

    constructor() {
        this.init()
    }

    init() {
        mongoose.connect('mongodb://localhost/test', 
            { 
                useNewUrlParser: true, 
                useUnifiedTopology: true
            },
            console.log("mongodb connected")
        )
    }
}

export default new Database()